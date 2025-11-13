//middleware takes in request, response and next and "does something with it (like here we validate the request body) 
// if it validates it then it sends on and if not then sends back an error response"
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

    next(); // kui valideerimine õnnestus, kutsume järgmise middleware'i või kontrolleri, request can go further

};