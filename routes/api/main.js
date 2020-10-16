const router = require("express").Router();
const {insertQuery,selectAll,deleteOne,select,updateQuery} = require("../../db");

router.get("/:code", async (req, res) => {
    const { code } = req.params;
     let query = {
       hash: code,
     };
    try {
      const starttime = Date.now();
      const {originalUrl} = await select(query);
      // console.log('hello');
      const countQuery = {
        code,
      };
      let countValue = { $inc: { count: 1 } };
      await updateQuery(countQuery, countValue).catch((err) => err);
      console.log("Time taken for query ", (Date.now() - starttime) / 1000);
      res.redirect(originalUrl);
    } catch (err) {
      console.log(err);
    }
  });


module.exports = router;
