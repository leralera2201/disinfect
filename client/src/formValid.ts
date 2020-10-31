interface Interface {
    errors: Object,
}

export const phoneRegex = RegExp(/((\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4}))/)
export const nameRegex = RegExp(/^[\u0400-\u04FF]+([\s\.'][\u0400-\u04FF])*$/)

export const formValid = ({ errors, ...rest }: Interface) => {
    let valid = true;

    // validate form errors being empty
    Object.values(errors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        (val === null || val === '') && (valid = false);
    });

    return valid;
};
