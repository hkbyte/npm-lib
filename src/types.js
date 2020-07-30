// Importing Joi
const joi = require("@hapi/joi")

/**
 * Set Property for Falsy Custom Default Values
 * @param {*} prop
 * @param {boolean} [def=null] Default Value
 * @returns {*}
*/
function setProps(prop, def = null) {
	return prop == undefined ? def : prop
}

// Joi Extension for JSON Validation
const joiExtension = joi.extend((joi) => {
	return {
		type: "json",
		base: joi.object(),
		coerce(value, schema) {

			if (value) {
				if (value[0] !== '{' &&
					!/^\s*\{/.test(value)) {
					return;
				}
			}
			else {
				return { value: null }
			}

			try {
				return { value: JSON.parse(value) }
			}
			catch (err) {
				throw err
			}
		}
	}
})


// Abstract Object
const Type = {}

/**
 * Type: object
 * @param {boolean} [required=false]
 * @param {object} [schema={}] JSON Schema Object
 * @param {object} [props={}] Field Properties
 * @param {number} [props.length=] The number of object keys allowed
 * @param {number} [props.min=] The lowest number of keys allowed
 * @param {number} [props.max=] The highest number of object keys
 * @param {boolean} [props.unknown=] Allows unknown keys if true
 * @param {object} [args={}] Field Arguments for post validation modifications
 * @param {default} [args.default=null] Default value if field is null
 * @returns {*} Joi object
*/
Type.object = function (required = false, schema = {}, props = {}, args = {}) {
	// Default Props
	const propLength = props.length || null // the number of object keys allowed
	const propMin = props.min || null // the lowest number of keys allowed 
	const propMax = props.max || null // the highest number of object keys
	const propUnknown = props.unknown || false // allows unknown keys if true

	// Default Args
	const argDefault = args.default || (args.default == 0 || args.default == false) ? args.default : null

	// Field Initialize
	let result = joi.object(schema)

	// Length
	if (propLength) {
		result = result.length(propLength)
	}
	else {
		// Max
		if (propMax) {
			result = result.max(propMax)
		}

		// Min
		if (propMin) {
			result = result.min(propMin)
		}
	}

	// Unknown
	if (propUnknown) {
		result = result.unknown()
	}

	// Required and Default Argument
	result = required ? result.required() : result.allow('', null).empty(['', null]).default(argDefault)

	// Returning
	return result
}

/**
 * Type: integer
 * @param {boolean} [required=false]
 * @param {object} [props={}] Field Properties
 * @param {boolean} [props.positive=] Requires the number to be positive
 * @param {boolean} [props.negative=] Requires the number to be negative
 * @param {number} [props.gt=] Specifies that the value must be greater than limit
 * @param {number} [props.lt=] Specifies that the value must be less than limit
 * @param {number} [props.min=] The maximum value allowed
 * @param {number} [props.max=] The minimum value allowed
 * @param {boolean} [props.unsafe=] Allows javascript unsafe numbers
 * @param {object} [args={}] Field Arguments for post validation modifications
 * @param {default} [args.default=null] Default value if field is null
 * @returns {*} Joi object
*/
Type.integer = function (required = false, props = {}, args = {}) {
	// Default Props
	const propPositive = props.positive || false
	const propNegative = props.negative || false
	const propGt = props.gt || null
	const propLt = props.lt || null
	const propMin = props.min || null
	const propMax = props.max || null
	const propUnsafe = props.unsafe || false

	// Default Args
	const argDefault = args.default || (args.default == 0 || args.default == false) ? args.default : null

	// Field Initialize
	let result = joi.number().integer()

	// Props Positive or Negative
	if (propPositive) {
		result = result.positive()
	}
	else if (propNegative) {
		result = result.negative()
	}

	// Greater
	if (propGt) {
		result = result.greater(propGt)
	}

	// Lesser
	if (propLt) {
		result = result.less(propLt)
	}

	// Max
	if (propMax) {
		result = result.max(propMax)
	}

	// Min
	if (propMin) {
		result = result.min(propMin)
	}

	// Unsafe Numbers
	if (propUnsafe) {
		result = result.unsafe()
	}

	// Required and Default Argument
	result = required ? result.required() : result.allow('', null).empty(['', null]).default(argDefault)

	// Returning
	return result
}

/**
 * Type: float
 * @param {boolean} [required=false]
 * @param {object} [props={}] Field Properties
 * @param {boolean} [props.positive=] Requires the number to be positive
 * @param {boolean} [props.negative=] Requires the number to be negative
 * @param {number} [props.gt=] Specifies that the value must be greater than limit
 * @param {number} [props.lt=] Specifies that the value must be less than limit
 * @param {number} [props.min=] The maximum value allowed
 * @param {number} [props.max=] The minimum value allowed
 * @param {boolean} [props.unsafe=] Allows javascript unsafe numbers
 * @param {object} [args={}] Field Arguments for post validation modifications
 * @param {default} [args.default=null] Default value if field is null
 * @returns {*} Joi object
*/
Type.float = function (required = false, props = {}, args = {}) {
	// Default Props
	const propPositive = props.positive || false
	const propNegative = props.negative || false
	const propGt = props.gt || null
	const propLt = props.lt || null
	const propMin = props.min || null
	const propMax = props.max || null
	const propPrecision = props.precision || null

	// Default Args
	const argDefault = args.default || (args.default == 0 || args.default == false) ? args.default : null

	// Field Initialize
	let result = joi.number()

	// Props Positive or Negative
	if (propPositive) {
		result = result.positive()
	}
	else if (propNegative) {
		result = result.negative()
	}

	// Greater
	if (propGt) {
		result = result.greater(propGt)
	}

	// Lesser
	if (propLt) {
		result = result.less(propLt)
	}

	// Max
	if (propMax) {
		result = result.max(propMax)
	}

	// Min
	if (propMin) {
		result = result.min(propMin)
	}

	// Preceision
	if (propPrecision) {
		result = result.precision(propPrecision)
	}

	// Required and Default Argument
	result = required ? result.required() : result.allow('', null).empty(['', null]).default(argDefault)

	// Returning
	return result
}

/**
 * Type: port
 * @param {boolean} [required=false]
 * @param {object} [props={}] Field Properties
 * @param {number} [props.gt=] Specifies that the value must be greater than limit
 * @param {number} [props.lt=] Specifies that the value must be less than limit
 * @param {number} [props.min=] The maximum value allowed
 * @param {number} [props.max=] The minimum value allowed
 * @param {object} [args={}] Field Arguments for post validation modifications
 * @param {default} [args.default=null] Default value if field is null
 * @returns {*} Joi object
*/
Type.port = function (required = false, props = {}, args = {}) {
	// Default Props
	const propGt = props.gt || null
	const propLt = props.lt || null
	const propMin = props.min || null
	const propMax = props.max || null

	// Default Args
	const argDefault = args.default || (args.default == 0 || args.default == false) ? args.default : null

	// Field Initialize
	let result = joi.number().port()

	// Greater
	if (propGt) {
		result = result.greater(propGt)
	}

	// Lesser
	if (propLt) {
		result = result.less(propLt)
	}

	// Max
	if (propMax) {
		result = result.max(propMax)
	}

	// Min
	if (propMin) {
		result = result.min(propMin)
	}

	// Required and Default Argument
	result = required ? result.required() : result.allow('', null).empty(['', null]).default(argDefault)

	// Returning
	return result
}

/**
 * Type: string
 * @param {boolean} [required=false]
 * @param {object} [props={}] Field Properties
 * @param {boolean} [props.alphanum=false] Requires the string value to only contain a-z, A-Z, and 0-9.
 * @param {boolean} [props.token=false] Requires the string value to only contain a-z, A-Z, 0-9, and underscore _.
 * @param {string} [props.case=] Can be either 'upper' or 'lower'
 * @param {number} [props.length=] The exact number of string characters allowed
 * @param {number} [props.min=] The maximum number of string characters allowed
 * @param {number} [props.max=] The minimum number of string characters required
 * @param {object} [args={}] Field Arguments for post validation modifications
 * @param {default} [args.default=null] Default value if field is null
 * @param {default} [args.lowercase=false] Convert string to lowercase
 * @param {default} [args.uppercase=false] Convert string to uppercase
 * @param {default} [args.normalize=null] The Unicode normalization form to use. Valid values: NFC [default], NFD, NFKC, NFKD
 * @param {default} [args.trim=true] The string will be trimmed
 * @returns {*} Joi object
*/
Type.string = function (required = false, props = {}, args = {}) {
	// Default Props
	const propAplhaNum = props.alphanum || false // Requires the string value to only contain a-z, A-Z, and 0-9.
	const propToken = props.token || false // Requires the string value to only contain a-z, A-Z, 0-9, and underscore _.
	const propCase = props.case || null // can be either 'upper' or 'lower'
	const propLength = props.length || null
	const propMax = props.max || null // the maximum number of string characters allowed
	const propMin = props.min || null // the minimum number of string characters required

	// Default Args
	const argDefault = args.default || (args.default == 0 || args.default == false) ? args.default : null // Default Value
	const argLowercase = args.lowercase || false
	const argUppercase = args.uppercase || false
	const argNormalize = args.normalize || null // The Unicode normalization form to use. Valid values: NFC [default], NFD, NFKC, NFKD
	const argTrim = setProps(args.trim, true) // the string will be trimmed

	// Field Initialize
	let result = joi.string()

	// Trim
	if (argTrim) {
		result = result.trim()
	}

	// Aplha Numeric or Token String
	if (propToken) {
		result = result.token()
	}
	else if (propAplhaNum) {
		result = result.alphanum()
	}

	// String Case
	if (propCase) {
		result = result.case(propCase)
	}

	// Length
	if (propLength) {
		result = result.length(propLength)
	}
	else {
		// Max
		if (propMax) {
			result = result.max(propMax)
		}

		// Min
		if (propMin) {
			result = result.min(propMin)
		}
	}

	// Lowercase or Uppercase
	if (argLowercase) {
		result = result.lowercase()
	}
	else if (argUppercase) {
		result = result.uppercase()
	}

	// Normalize
	if (argNormalize) {
		result = result.normalize(argNormalize)
	}

	// Required and Default Argument
	result = required ? result.required() : result.allow('', null).empty(['', null]).default(argDefault)

	// Returning
	return result
}

/**
 * Type: base64
 * @param {boolean} [required=false]
 * @param {object} [props={}] Field Properties
 * @param {boolean} [props.paddingRequired=true] If true, the string must be properly padded with the = characters
 * @param {boolean} [props.urlSafe=false] If true, uses the URI-safe base64 format which replaces + with - and \ with _
 * @param {object} [args={}] Field Arguments for post validation modifications
 * @param {default} [args.default=null] Default value if field is null
 * @returns {*} Joi object
*/
Type.base64 = function (required = false, props = {}, args = {}) {
	const propPaddingRequired = setProps(props.paddingRequired, true) // if true, the string must be properly padded with the = characters
	const propUrlSafe = props.urlSafe || false // if true, uses the URI-safe base64 format which replaces + with - and \ with _

	// Default Args
	const argDefault = args.default || (args.default == 0 || args.default == false) ? args.default : null

	// Field Initialize
	let result = joi.string().base64({
		paddingRequired: propPaddingRequired,
		urlSafe: propUrlSafe
	})

	// Required and Default Argument
	result = required ? result.required() : result.allow('', null).empty(['', null]).default(argDefault)

	// Returning
	return result
}

/**
 * Type: alphanum
 * @param {boolean} [required=false]
 * @param {object} [props={}] Field Properties
 * @param {string} [props.case=] Can be either 'upper' or 'lower'
 * @param {number} [props.length=] The exact number of string characters allowed
 * @param {number} [props.min=] The maximum number of string characters allowed
 * @param {number} [props.max=] The minimum number of string characters required
 * @param {object} [args={}] Field Arguments for post validation modifications
 * @param {default} [args.default=null] Default value if field is null
 * @param {default} [args.lowercase=false] Convert string to lowercase
 * @param {default} [args.uppercase=false] Convert string to uppercase
 * @param {default} [args.normalize=null] The Unicode normalization form to use. Valid values: NFC [default], NFD, NFKC, NFKD
 * @param {default} [args.trim=true] The string will be trimmed
 * @returns {*} Joi object
*/
Type.alphanum = function (required = false, props = {}, args = {}) {
	// Default Props
	const propCase = props.case || null // can be either 'upper' or 'lower'
	const propLength = props.length || null
	const propMax = props.max || null // the maximum number of string characters allowed
	const propMin = props.min || null // the minimum number of string characters required

	// Default Args
	const argDefault = args.default || (args.default == 0 || args.default == false) ? args.default : null // Default Value
	const argLowercase = args.lowercase || false
	const argUppercase = args.uppercase || false
	const argNormalize = args.normalize || null // The Unicode normalization form to use. Valid values: NFC [default], NFD, NFKC, NFKD
	const argTrim = setProps(args.trim, true) // the string will be trimmed

	// Field Initialize
	let result = joi.string().alphanum()

	// Trim
	if (argTrim) {
		result = result.trim()
	}

	// String Case
	if (propCase) {
		result = result.case(propCase)
	}

	// Length
	if (propLength) {
		result = result.length(propLength)
	}
	else {
		// Max
		if (propMax) {
			result = result.max(propMax)
		}

		// Min
		if (propMin) {
			result = result.min(propMin)
		}
	}


	// Lowercase
	if (argLowercase) {
		result = result.lowercase()
	}
	else if (argUppercase) {
		result = result.uppercase()
	}

	// Normalize
	if (argNormalize) {
		result = result.normalize(argNormalize)
	}

	// Required and Default Argument
	result = required ? result.required() : result.allow('', null).empty(['', null]).default(argDefault)

	// Returning
	return result
}

/**
 * Type: token
 * @param {boolean} [required=false]
 * @param {object} [props={}] Field Properties
 * @param {string} [props.case=] Can be either 'upper' or 'lower'
 * @param {number} [props.length=] The exact number of string characters allowed
 * @param {number} [props.min=] The maximum number of string characters allowed
 * @param {number} [props.max=] The minimum number of string characters required
 * @param {object} [args={}] Field Arguments for post validation modifications
 * @param {default} [args.default=null] Default value if field is null
 * @param {default} [args.lowercase=false] Convert string to lowercase
 * @param {default} [args.uppercase=false] Convert string to uppercase
 * @param {default} [args.normalize=null] The Unicode normalization form to use. Valid values: NFC [default], NFD, NFKC, NFKD
 * @param {default} [args.trim=true] The string will be trimmed
 * @returns {*} Joi object
*/
Type.token = function (required = false, props = {}, args = {}) {
	// Default Props
	const propCase = props.case || null // can be either 'upper' or 'lower'
	const propLength = props.length || null
	const propMax = props.max || null // the maximum number of string characters allowed
	const propMin = props.min || null // the minimum number of string characters required

	// Default Args
	const argDefault = args.default || (args.default == 0 || args.default == false) ? args.default : null // Default Value
	const argLowercase = args.lowercase || false
	const argUppercase = args.uppercase || false
	const argNormalize = args.normalize || null // The Unicode normalization form to use. Valid values: NFC [default], NFD, NFKC, NFKD
	const argTrim = setProps(args.trim, true) // the string will be trimmed

	// Field Initialize
	let result = joi.string().token()

	// Trim
	if (argTrim) {
		result = result.trim()
	}

	// String Case
	if (propCase) {
		result = result.case(propCase)
	}

	// Length
	if (propLength) {
		result = result.length(propLength)
	}
	else {
		// Max
		if (propMax) {
			result = result.max(propMax)
		}

		// Min
		if (propMin) {
			result = result.min(propMin)
		}
	}

	// Lowercase
	if (argLowercase) {
		result = result.lowercase()
	}
	else if (argUppercase) {
		result = result.uppercase()
	}

	// Normalize
	if (argNormalize) {
		result = result.normalize(argNormalize)
	}

	// Required and Default Argument
	result = required ? result.required() : result.allow('', null).empty(['', null]).default(argDefault)

	// Returning
	return result
}

/**
 * Type: email
 * @param {boolean} [required=false]
 * @param {object} [props={}] Field Properties
 * @param {boolean} [props.allowUnicode=false] If true, Unicode characters are permitted
 * @param {number} [props.minDomainSegments=2] Number of segments required for the domain
 * @param {string} [props.case=] Can be either 'upper' or 'lower'
 * @param {number} [props.length=] The exact number of string characters allowed
 * @param {number} [props.min=] The maximum number of string characters allowed
 * @param {number} [props.max=] The minimum number of string characters required
 * @param {object} [args={}] Field Arguments for post validation modifications
 * @param {default} [args.default=null] Default value if field is null
 * @param {default} [args.lowercase=false] Convert string to lowercase
 * @param {default} [args.uppercase=false] Convert string to uppercase
 * @param {default} [args.normalize=null] The Unicode normalization form to use. Valid values: NFC [default], NFD, NFKC, NFKD
 * @param {default} [args.trim=true] The string will be trimmed
 * @returns {*} Joi object
*/
Type.email = function (required = false, props = {}, args = {}) {
	// Default Props
	const propCase = props.case || null // can be either 'upper' or 'lower'
	const propLength = props.length || null
	const propMax = props.max || null // the maximum number of string characters allowed
	const propMin = props.min || null // the minimum number of string characters required
	const propAllowUnicode = props.allowUnicode || false // if true, Unicode characters are permitted
	const propMinDomainSegments = props.minDomainSegments || 2 // Number of segments required for the domain

	// Default Args
	const argDefault = args.default || (args.default == 0 || args.default == false) ? args.default : null // Default Value
	const argLowercase = args.lowercase || false
	const argUppercase = args.uppercase || false
	const argNormalize = args.normalize || null // The Unicode normalization form to use. Valid values: NFC [default], NFD, NFKC, NFKD
	const argTrim = setProps(args.trim, true) // the string will be trimmed

	// Field Initialize
	let result = joi.string().email({
		allowUnicode: propAllowUnicode,
		minDomainSegments: propMinDomainSegments
	})

	// Trim
	if (argTrim) {
		result = result.trim()
	}

	// String Case
	if (propCase) {
		result = result.case(propCase)
	}

	// Length
	if (propLength) {
		result = result.length(propLength)
	}
	else {
		// Max
		if (propMax) {
			result = result.max(propMax)
		}

		// Min
		if (propMin) {
			result = result.min(propMin)
		}
	}

	// Lowercase
	if (argLowercase) {
		result = result.lowercase()
	}
	else if (argUppercase) {
		result = result.uppercase()
	}

	// Normalize
	if (argNormalize) {
		result = result.normalize(argNormalize)
	}

	// Required and Default Argument
	result = required ? result.required() : result.allow('', null).empty(['', null]).default(argDefault)

	// Returning
	return result
}

/**
 * Type: pattern
 * @param {boolean} [required=false]
 * @param {RegExp} pattern Regular Expression pattern
 * @param {object} [props={}] Field Properties
 * @param {string} [props.name=] Pattern name
 * @param {string} [props.case=] Can be either 'upper' or 'lower'
 * @param {number} [props.length=] The exact number of string characters allowed
 * @param {number} [props.min=] The maximum number of string characters allowed
 * @param {number} [props.max=] The minimum number of string characters required
 * @param {object} [args={}] Field Arguments for post validation modifications
 * @param {default} [args.default=null] Default value if field is null
 * @param {default} [args.lowercase=false] Convert string to lowercase
 * @param {default} [args.uppercase=false] Convert string to uppercase
 * @param {default} [args.normalize=null] The Unicode normalization form to use. Valid values: NFC [default], NFD, NFKC, NFKD
 * @param {default} [args.trim=true] The string will be trimmed
 * @returns {*} Joi object
*/
Type.pattern = function (required = false, pattern, props = {}, args = {}) {
	const propName = props.name || null // name of pattern
	const propCase = props.case || null // can be either 'upper' or 'lower'
	const propLength = props.length || null
	const propMax = props.max || null // the maximum number of string characters allowed
	const propMin = props.min || null // the minimum number of string characters required

	// Default Args
	const argDefault = args.default || (args.default == 0 || args.default == false) ? args.default : null // Default Value
	const argLowercase = args.lowercase || false
	const argUppercase = args.uppercase || false
	const argNormalize = args.normalize || null // The Unicode normalization form to use. Valid values: NFC [default], NFD, NFKC, NFKD
	const argTrim = setProps(args.trim, true) // the string will be trimmed

	// Field Initialize
	let result = joi.string().pattern(pattern, propName || undefined)

	// Trim
	if (argTrim) {
		result = result.trim()
	}

	// String Case
	if (propCase) {
		result = result.case(propCase)
	}

	// Length
	if (propLength) {
		result = result.length(propLength)
	}
	else {
		// Max
		if (propMax) {
			result = result.max(propMax)
		}

		// Min
		if (propMin) {
			result = result.min(propMin)
		}
	}

	// Lowercase
	if (argLowercase) {
		result = result.lowercase()
	}
	else if (argUppercase) {
		result = result.uppercase()
	}

	// Normalize
	if (argNormalize) {
		result = result.normalize(argNormalize)
	}

	// Required and Default Argument
	result = required ? result.required() : result.allow('', null).empty(['', null]).default(argDefault)

	// Returning
	return result
}

/**
 * Type: creditCard
 * @param {boolean} [required=false]
 * @param {object} [props={}] Field Properties
 * @param {number} [props.length=] The exact number of string characters allowed
 * @param {number} [props.min=] The maximum number of string characters allowed
 * @param {number} [props.max=] The minimum number of string characters required
 * @param {object} [args={}] Field Arguments for post validation modifications
 * @param {default} [args.default=null] Default value if field is null
 * @param {default} [args.trim=true] The string will be trimmed
 * @returns {*} Joi object
*/
Type.creditCard = function (required = false, props = {}, args = {}) {
	// Default Props
	const propLength = props.length || null
	const propMax = props.max || null // the maximum number of string characters allowed
	const propMin = props.min || null // the minimum number of string characters required

	// Default Args
	const argDefault = args.default || (args.default == 0 || args.default == false) ? args.default : null // Default Value
	const argTrim = setProps(args.trim, true) // the string will be trimmed

	// Field Initialize
	let result = joi.string().creditCard()

	// Trim
	if (argTrim) {
		result = result.trim()
	}

	// Length
	if (propLength) {
		result = result.length(propLength)
	}
	else {
		// Max
		if (propMax) {
			result = result.max(propMax)
		}

		// Min
		if (propMin) {
			result = result.min(propMin)
		}
	}

	// Required and Default Argument
	result = required ? result.required() : result.allow('', null).empty(['', null]).default(argDefault)

	// Returning
	return result
}

/**
 * Type: dataUri
 * @param {boolean} [required=false]
 * @param {object} [props={}] Field Properties
 * @param {boolean} [props.paddingRequired=false] Which will require = padding if true
 * @param {number} [props.length=] The exact number of string characters allowed
 * @param {number} [props.min=] The maximum number of string characters allowed
 * @param {number} [props.max=] The minimum number of string characters required
 * @param {object} [args={}] Field Arguments for post validation modifications
 * @param {default} [args.default=null] Default value if field is null
 * @param {default} [args.trim=true] The string will be trimmed
 * @returns {*} Joi object
*/
Type.dataUri = function (required = false, props = {}, args = {}) {
	// Default Props
	const propLength = props.length || null
	const propMax = props.max || null // the maximum number of string characters allowed
	const propMin = props.min || null // the minimum number of string characters required
	const propPaddingRequired = setProps(props.paddingRequired, true) // which will require = padding if true

	// Default Args
	const argDefault = args.default || (args.default == 0 || args.default == false) ? args.default : null // Default Value
	const argTrim = setProps(args.trim, true) // the string will be trimmed

	// Field Initialize
	let result = joi.string().dataUri({
		paddingRequired: propPaddingRequired
	})

	// Trim
	if (argTrim) {
		result = result.trim()
	}

	// Length
	if (propLength) {
		result = result.length(propLength)
	}
	else {
		// Max
		if (propMax) {
			result = result.max(propMax)
		}

		// Min
		if (propMin) {
			result = result.min(propMin)
		}
	}

	// Required and Default Argument
	result = required ? result.required() : result.allow('', null).empty(['', null]).default(argDefault)

	// Returning
	return result
}

/**
 * Type: domain
 * @param {boolean} [required=false]
 * @param {object} [props={}] Field Properties
 * @param {boolean} [props.allowUnicode=false] If true, Unicode characters are permitted
 * @param {number} [props.minDomainSegments=false] Number of segments required for the domain
 * @param {number} [props.length=] The exact number of string characters allowed
 * @param {number} [props.min=] The maximum number of string characters allowed
 * @param {number} [props.max=] The minimum number of string characters required
 * @param {object} [args={}] Field Arguments for post validation modifications
 * @param {default} [args.default=null] Default value if field is null
 * @param {default} [args.trim=true] The string will be trimmed
 * @returns {*} Joi object
*/
Type.domain = function (required = false, props = {}, args = {}) {
	// Default Props
	const propLength = props.length || null
	const propMax = props.max || null // the maximum number of string characters allowed
	const propMin = props.min || null // the minimum number of string characters required
	const propAllowUnicode = props.allowUnicode || false // if true, Unicode characters are permitted
	const propMinDomainSegments = props.minDomainSegments || 2 // Number of segments required for the domain

	// Default Args
	const argDefault = args.default || (args.default == 0 || args.default == false) ? args.default : null // Default Value
	const argTrim = setProps(args.trim, true) // the string will be trimmed if true

	// Field Initialize
	let result = joi.string().domain({
		allowUnicode: propAllowUnicode,
		minDomainSegments: propMinDomainSegments
	})

	// Trim
	if (argTrim) {
		result = result.trim()
	}

	// Length
	if (propLength) {
		result = result.length(propLength)
	}
	else {
		// Max
		if (propMax) {
			result = result.max(propMax)
		}

		// Min
		if (propMin) {
			result = result.min(propMin)
		}
	}

	// Required and Default Argument
	result = required ? result.required() : result.allow('', null).empty(['', null]).default(argDefault)

	// Returning
	return result
}

/**
 * Type: hex
 * @param {boolean} [required=false]
 * @param {object} [props={}] Field Properties
 * @param {number} [props.length=] The exact number of string characters allowed
 * @param {object} [args={}] Field Arguments for post validation modifications
 * @param {default} [args.default=null] Default value if field is null
 * @param {default} [args.byteAligned=false] A 0 will be added in front of the string in case it needs to be aligned
 * @param {default} [args.trim=true] The string will be trimmed
 * @returns {*} Joi object
*/
Type.hex = function (required = false, props = {}, args = {}) {
	// Default Props
	const propLength = props.length || null

	// Default Args
	const argDefault = args.default || (args.default == 0 || args.default == false) ? args.default : null // Default Value
	const argTrim = setProps(args.trim, true) // the string will be trimmed
	const argByteAligned = args.byteAligned || false // A 0 will be added in front of the string in case it needs to be aligned

	const options = {}

	// Trim
	if (argByteAligned) {
		options.byteAligned = true
	}

	// Field Initialize
	let result = joi.string().hex(options)

	// Trim
	if (argTrim) {
		result = result.trim()
	}

	// Length
	if (propLength) {
		result = result.length(propLength)
	}

	// Required and Default Argument
	result = required ? result.required() : result.allow('', null).empty(['', null]).default(argDefault)

	// Returning
	return result
}

/**
 * Type: ip
 * @param {boolean} [required=false]
 * @param {object} [props={}] Field Properties
 * @param {string} [props.version=] Valid values: ipv4, ipv6, ipvfuture
 * @param {number} [props.cidr=] Valid values: optional, required, forbidden
 * @param {object} [args={}] Field Arguments for post validation modifications
 * @param {default} [args.default=null] Default value if field is null
 * @param {default} [args.trim=true] The string will be trimmed
 * @returns {*} Joi object
*/
Type.ip = function (required = false, props = {}, args = {}) {
	// Default Props
	const propVersion = props.version || null // Valid values: ipv4, ipv6, ipvfuture
	const propCidr = props.cidr || null // Valid values: optional, required, forbidden

	// Default Args
	const argDefault = args.default || (args.default == 0 || args.default == false) ? args.default : null // Default Value
	const argTrim = setProps(args.trim, true) // the string will be trimmed

	const options = {}

	// Version
	if (propVersion) {
		options.version = propVersion
	}

	// CIDR
	if (propCidr) {
		options.cidr = propCidr
	}

	// Field Initialize
	let result = joi.string().ip(options)

	// Trim
	if (argTrim) {
		result = result.trim()
	}

	// Required and Default Argument
	result = required ? result.required() : result.allow('', null).empty(['', null]).default(argDefault)

	// Returning
	return result
}

/**
 * Type: json
 * @param {boolean} [required=false]
 * @param {object} [props={}] Field Properties
 * @param {object} [args={}] Field Arguments for post validation modifications
 * @param {default} [args.default=null] Default value if field is null
 * @returns {*} Joi object
*/
Type.json = function (required = false, props = {}, args = {}) {
	// Field Initialization
	let result = joiExtension.json()

	// Default Args
	const argDefault = args.default || (args.default == 0 || args.default == false) ? args.default : null // Default Value

	// Required and Default Argument
	result = required ? result.required() : result.allow('', null).empty(['', null]).default(argDefault)

	return result
}

// Field Type: array

/**
 * Type: string
 * @param {boolean} [required=false]
 * @param {object} [props={}] Field Properties
 * @param {boolean} [props.alphanum=false] Requires the string value to only contain a-z, A-Z, and 0-9.
 * @param {boolean} [props.token=false] Requires the string value to only contain a-z, A-Z, 0-9, and underscore _.
 * @param {string} [props.case=] Can be either 'upper' or 'lower'
 * @param {number} [props.length=] The exact number of string characters allowed
 * @param {number} [props.min=] The maximum number of string characters allowed
 * @param {number} [props.max=] The minimum number of string characters required
 * @param {object} [args={}] Field Arguments for post validation modifications
 * @param {default} [args.default=null] Default value if field is null
 * @param {default} [args.lowercase=false] Convert string to lowercase
 * @param {default} [args.uppercase=false] Convert string to uppercase
 * @param {default} [args.normalize=null] The Unicode normalization form to use. Valid values: NFC [default], NFD, NFKC, NFKD
 * @param {default} [args.trim=true] The string will be trimmed
 * @returns {*} Joi object
*/
Type.array = function (required = false, schema, props = {}, args = {}) {
	// Default Props
	const propLength = props.length || null // the number of array items allowed
	const propMax = props.max || null // the highest number of array items allowed
	const propMin = props.min || null // the lowest number of array items allowed

	// Default Args
	const argDefault = args.default || (args.default == 0 || args.default == false) ? args.default : null // Default Value

	// Field Initialization
	let result = joi.array().items(schema)

	// Length
	if (propLength) {
		result = result.length(propLength)
	}
	else {
		// Max
		if (propMax) {
			result = result.max(propMax)
		}

		// Min
		if (propMin) {
			result = result.min(propMin)
		}
	}

	// Required and Default Argument
	result = required ? result.required() : result.allow('', null).empty(['', null]).default(argDefault)

	// Returning
	return result
}

// Field Type: binary

/**
 * Type: string
 * @param {boolean} [required=false]
 * @param {object} [props={}] Field Properties
 * @param {boolean} [props.alphanum=false] Requires the string value to only contain a-z, A-Z, and 0-9.
 * @param {boolean} [props.token=false] Requires the string value to only contain a-z, A-Z, 0-9, and underscore _.
 * @param {string} [props.case=] Can be either 'upper' or 'lower'
 * @param {number} [props.length=] The exact number of string characters allowed
 * @param {number} [props.min=] The maximum number of string characters allowed
 * @param {number} [props.max=] The minimum number of string characters required
 * @param {object} [args={}] Field Arguments for post validation modifications
 * @param {default} [args.default=null] Default value if field is null
 * @param {default} [args.lowercase=false] Convert string to lowercase
 * @param {default} [args.uppercase=false] Convert string to uppercase
 * @param {default} [args.normalize=null] The Unicode normalization form to use. Valid values: NFC [default], NFD, NFKC, NFKD
 * @param {default} [args.trim=true] The string will be trimmed
 * @returns {*} Joi object
*/
Type.binary = function (required = false, props = {}, args = {}) {
	// Default Props
	const propEncoding = props.encoding || null // the encoding scheme eg. base64
	const propLength = props.length || null // the size of buffer allowed
	const propMax = props.max || null // the highest size of buffer allowed
	const propMin = props.min || null //  the lowest size of the buffer  allowed

	// Default Args
	const argDefault = args.default || (args.default == 0 || args.default == false) ? args.default : null // Default Value

	// Field Initialization
	let result = joi.binary()

	// Length
	if (propEncoding) {
		result = result.encoding(propEncoding)
	}

	// Length
	if (propLength) {
		result = result.length(propLength)
	}
	else {
		// Max
		if (propMax) {
			result = result.max(propMax)
		}

		// Min
		if (propMin) {
			result = result.min(propMin)
		}
	}

	// Required and Default Argument
	result = required ? result.required() : result.allow('', null).empty(['', null]).default(argDefault)

	// Returning
	return result
}

// Field Type: boolean

/**
 * Type: string
 * @param {boolean} [required=false]
 * @param {object} [props={}] Field Properties
 * @param {boolean} [props.alphanum=false] Requires the string value to only contain a-z, A-Z, and 0-9.
 * @param {boolean} [props.token=false] Requires the string value to only contain a-z, A-Z, 0-9, and underscore _.
 * @param {string} [props.case=] Can be either 'upper' or 'lower'
 * @param {number} [props.length=] The exact number of string characters allowed
 * @param {number} [props.min=] The maximum number of string characters allowed
 * @param {number} [props.max=] The minimum number of string characters required
 * @param {object} [args={}] Field Arguments for post validation modifications
 * @param {default} [args.default=null] Default value if field is null
 * @param {default} [args.lowercase=false] Convert string to lowercase
 * @param {default} [args.uppercase=false] Convert string to uppercase
 * @param {default} [args.normalize=null] The Unicode normalization form to use. Valid values: NFC [default], NFD, NFKC, NFKD
 * @param {default} [args.trim=true] The string will be trimmed
 * @returns {*} Joi object
*/
Type.boolean = function (required = false, args = {}) {
	// Default Args
	const argDefault = setProps(args.default) // Default Value

	// Field Initialization
	let result = joi.boolean()

	// Required and Default Argument
	result = required ? result.required() : result.allow('', null).empty(['', null]).default(argDefault)

	// Returning
	return result
}

/**
 * Type: date
 * @param {boolean} [required=false]
 * @param {object} [props={}] Field Properties
 * @param {number} [props.gt=] Specifies that the value must be greater than limit
 * @param {number} [props.lt=] Specifies that the value must be less than limit
 * @param {number} [props.min=] The maximum value allowed
 * @param {number} [props.max=] The minimum value allowed
 * @param {boolean} [props.iso=false] Requires the string value to be in valid ISO 8601 date format
 * @param {string} [props.timestamp='javascript'] The type of timestamp (allowed values are unix or javascript [default])
 * @param {object} [args={}] Field Arguments for post validation modifications
 * @param {default} [args.default=null] Default value if field is null
 * @returns {*} Joi object
*/
Type.date = function (required = false, props = {}, args = {}) {
	// Default Props
	const propGt = props.gt || null
	const propLt = props.lt || null
	const propMin = props.min || null
	const propMax = props.max || null
	const propIso = props.iso || false // Requires the string value to be in valid ISO 8601 date format
	const propTimestamp = props.timestamp || null // the type of timestamp (allowed values are unix or javascript [default])

	// Default Args
	const argDefault = args.default || (args.default == 0 || args.default == false) ? args.default : null

	// Field Initialize
	let result = joi.date()

	// ISO
	if (propIso) {
		result = result.iso()
	}

	// Timestamp
	if (propTimestamp) {
		result = result.timestamp(propTimestamp)
	}

	// Greater
	if (propGt) {
		result = result.greater(propGt)
	}

	// Lesser
	if (propLt) {
		result = result.less(propLt)
	}

	// Max
	if (propMax) {
		result = result.max(propMax)
	}

	// Min
	if (propMin) {
		result = result.min(propMin)
	}

	// Required and Default Argument
	result = required ? result.required() : result.allow('', null).empty(['', null]).default(argDefault)

	// Returning
	return result
}


// Exporting
module.exports = Type