interface Interface {
    errors: Object,
}

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
