import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, of, switchMap } from "rxjs";

const Reset = "\x1b[0m"
const Bright = "\x1b[1m"
const Dim = "\x1b[2m"
const Underscore = "\x1b[4m"
const Blink = "\x1b[5m"
const Reverse = "\x1b[7m"
const Hidden = "\x1b[8m"

const FgBlack = "\x1b[30m"
const FgRed = "\x1b[31m"
const FgGreen = "\x1b[32m"
const FgYellow = "\x1b[33m"
const FgBlue = "\x1b[34m"
const FgMagenta = "\x1b[35m"
const FgCyan = "\x1b[36m"
const FgWhite = "\x1b[37m"

const BgBlack = "\x1b[40m"
const BgRed = "\x1b[41m"
const BgGreen = "\x1b[42m"
const BgYellow = "\x1b[43m"
const BgBlue = "\x1b[44m"
const BgMagenta = "\x1b[45m"
const BgCyan = "\x1b[46m"
const BgWhite = "\x1b[47m"

function error(message:string) {
    return `${FgRed}${message}${Reset}`
}

class FieldOptions {
    required?: boolean = false
    nullable?: boolean = true
}

type Field = {
    propertyKey: string,
    type: Function,
    options: FieldOptions
}

type ClassOptions = {
    strict?: boolean
}


type Class = {
    fields: Array<Field>,
    options: ClassOptions
}


let classes: {[name:string]: Class} = {}
let fields: Array<Field> = []


function BaseEntity(options: ClassOptions = {}) {
    return function(ctr: Function) {
        if (!classes[ctr.name]) {
            classes[ctr.name] = { fields, options }
            fields = []
        }
    }
}

function Entity(options: FieldOptions = {}) {
    return function (target: Object, propertyKey: string) {
        const metadata = Reflect.getMetadata("design:type", target, propertyKey);
        fields.push({
            propertyKey: propertyKey,
            type: metadata,
            options
        })
    }
}

class PropsCleanerNestInterceptor implements NestInterceptor {
    constructor(private cls: Function) {}
    colors: Array<string> = [];

    validate(cls: Function, req: Object, keys: Array<string>, res: Object) {
        const { strict=false } = classes[cls.name].options
        classes[cls.name].fields?.forEach(({propertyKey, type, options}) => {
            const { required=false, nullable=true } = options
            if (keys.includes(propertyKey)) {
                if (req[propertyKey] == null) {
                    if (typeof req[propertyKey] == 'undefined' && required)
                        throw new Error(`class ${error(cls.name)}: required field ${error(propertyKey)} must not be empty`)
                    if (!nullable)
                        throw new Error(`class ${error(cls.name)}: field ${error(propertyKey)} cannot be set to null`)
                    res[propertyKey] = req[propertyKey]
                }
                else if (typeof req[propertyKey] == 'string' && type.name == 'String' || 
                        typeof req[propertyKey] == 'boolean' && type.name == 'Boolean' ||
                        typeof req[propertyKey] == 'number' && type.name == 'Number')
                    res[propertyKey] = req[propertyKey]
                else if (typeof req[propertyKey] == 'object' && !['String', 'Boolean', 'Number'].includes(type.name)) {
                    res[propertyKey] = {}
                    this.validate(type, req[propertyKey], Object.keys(req[propertyKey]), res[propertyKey])
                }
                else {
                    if (strict)
                        throw new Error(`class ${error(cls.name)}: incorrect type of field ${error(propertyKey)} must be a ${error(type.name)}`)
                    res[propertyKey] = req[propertyKey]
                }
            }
            else {
                if (strict) throw new Error(`class ${error(cls.name)}: field ${error(propertyKey)} of type ${error(type.name)} must be setted`)
            }
        });
        if ((cls = Object.getPrototypeOf(cls) as Function).name != '') this.validate(cls, req, keys, res)
    }

    intercept(_: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(switchMap(req => {
            if (req instanceof Object) {
                let res: Object = {};
                this.validate(this.cls, req, Object.keys(req), res)
                return of(res)
            }
            return of(req);
        }))
    }
}

export { BaseEntity, Entity, PropsCleanerNestInterceptor }