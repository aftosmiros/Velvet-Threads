import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const {token} = req.headers;

    if (!token) {
        return res.status(401).json({success: false, message: 'Not authorized, Login again'})
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        req.body.isAdmin = token_decode.isAdmin
        next()
    } catch (error) {
        console.log(`Error occured in auth middleware - ${error}`)
        res.status(500).json({success: false, message: error.message})
    }

}

export default authUser