function admin(req, res, next) {

    if (!req.cookies.role || !req.cookies.role.includes("Admin")) return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

function patient(req, res, next) {
    console.log(req.cookies);
    if (!req.cookies.role || (!req.cookies.role.includes("Patient"))) return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

 function doctor(req, res, next) {
    if (!req.cookies.role || !req.cookies.role.includes("Doctor")) return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

function doctorOrPatient(req, res, next) {
    if (!req.cookies.role || (!req.cookies.role.includes("Doctor") && !req.cookies.role.includes("Patient")))
        return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

function manager(req, res, next) {
    if (!req.cookies.role || (!req.cookies.role.includes("Doctor") &&
        !req.cookies.role.includes("Health Official") &&
        !req.cookies.role.includes("Immigration Officer")))
        return res.status(403).send({
            ok: false,
            error: "Access denied."
        });

    next();
}

function doctorOrImmigrationOfficer(req, res, next) {
    if (!req.cookies || (!req.cookies.role.includes("Doctor") &&
        !req.cookies.role.includes("Immigration Officer")))
        return res.status(403).send({
            ok: false,
            error: "Access denied."
        });

    next();
}

module.exports = { admin, patient, doctor, doctorOrPatient, manager, doctorOrImmigrationOfficer };