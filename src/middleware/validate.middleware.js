export const validate = (schema) => (request, response, next) => {

    const { error } = schema.validate(request.body, { 
        abortEarly: false,
        errors: {
            wrap: {
                label: 'false'
            }
        }
    });

    if (error) {
        const errorBag = errors.details.reduce((accumulator, detail) => { // kogume kõik veateated ühte objekti
            const field = detail.path.join('.');        // võtame välja veateate välja nime
            accumulator[field] = detail.message;        // lisame veateate akumulaatorisse
            return accumulator;
        }, {});
        
        return response.status(400).json({          // tagastame 400 Bad Request koos veateadetega
            message: typeof error === "ValidationError" ? errors.message : 'Validation failed',
            errors: { ...errorBag }
        });
    }
};