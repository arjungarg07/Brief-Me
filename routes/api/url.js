const router = require('express').Router();
const {insertQuery,selectAll,deleteOne,select,updateQuery} = require("../../db");
const { generateHash } = require("../../uniqueUrlCode");

router.post("/shorten", async (req, res) => {
  const { originalUrl} = req.body;
  // console.log(checkForUrl);
  try{
      const checkUrl = await select({ originalUrl }).catch((err) => err);
      if (checkUrl) {
        const { hash } = checkUrl;
        let hashedUrl = `http://localhost:8000/${hash}`;
        res.send(hashedUrl);
        // res.send({msg:"Saved url sent",status:"0"});
      } else {
        const hashValue = (await generateHash(originalUrl)).slice(0, 6);
        // console.log(hashValue.slice(0, 6));
        let data = {
          hash: hashValue.slice(0, 6),
          originalUrl: originalUrl,
          creationDate: new Date(),
          redirectCount: 0,
        };
        insertQuery(data);
        let hashedUrl = `http://localhost:8000/${hashValue}`;
        res.send(hashedUrl);
      }
    }catch(err){
      console.log(err);
      res.send({msg:"error occured",status:"0"})
    }
  });

  module.exports = router;