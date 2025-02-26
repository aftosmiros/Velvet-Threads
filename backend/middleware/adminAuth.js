import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next)=>{
    try {
        const token = (req.headers.authorization || req.headers.token || "").replace(/Bearer\s?/, "");
        if (!token) {
            return res.status(401).json({success:false, msg:"forbidden"})
        }

        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!tokenDecoded) {
            return res.status(401).json({success:false, msg:"forbidden"})
        }
        if (!tokenDecoded.isAdmin) {
            return res.status(403).json({success:false, msg:"forbidden"})
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(403).json({ success: false, msg: "forbidden" })
    }
}

export default adminAuth