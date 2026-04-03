var adminMiddleware = async(req,res,next) => {
    try{
        if(req.user.role !== "admin"){
            return res.status(403).json({message : "cannot access admin routes"})
        }
        next()
    } catch (error) {
        console.log("error",error);
    }
}
module.exports = adminMiddleware