import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try{
        let token = req.header("Authorization");
        if(!token){
            return res.status(401).json({message: "Access denied :("});
        }
        if(token.startsWith("Bearer ")){
            token = token.substring(7, token.length);
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch(error){
        res.status(500).json({error: error.message});
    }
}