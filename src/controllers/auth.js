exports.register = (req, res, next) => {
    const result = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    res.status(201).json({
        message: 'Register Success',
        data: result
    })
}