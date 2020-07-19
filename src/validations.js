const joi = require("@hapi/joi")
const { BadRequestError, InvalidArgumentError } = require("./errors")

/**
 * Create new Schema
 * @class
 * @param {object} schema
 * @param {object} [props={}] Properties
 * @param {boolean} [props.unknown=false] Allow unknown keys and fields
*/
class Schema {
	constructor(schema, props = {}) {
		try {
			// Default Props
			const propUnknown = props.unknown || false

			// Intizialing Schema Object
			this.schema = joi.object().keys(schema)

			// Unknow Keys
			if (propUnknown) {
				this.schema = this.schema.unknown()
			}
			else {
				this.schema = this.schema.options({ stripUnknown: true })
			}
		}
		catch (err) {
			throw err
		}
	}

	/**
	 * Validates schema
	 * @class
	 * @param {*} payload
	*/
	async validate(payload) {
		try {
			if (!payload || payload == {}) {
				// Payload empty
				throw new BadRequestError("Payload is Empty")
			}

			// Returning values
			return await this.schema.validateAsync(payload)
		}
		catch (err) {
			if (err.name == "ValidationError") {
				const errType = err.details[0].type

				// Parameter missing validation error
				if (errType == "any.required") {
					throw new BadRequestError(err.message, err.stack)
				}

				// Parameter not valid
				throw new InvalidArgumentError(err.message, err.stack)
			}
			else {
				throw err
			}
		}
	}
}

// Exporting
module.exports = {
	Schema
}