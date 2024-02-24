const express = require("express");
const router = express.Router();
const shortUrl = require("../models/shortUrl");

router.get("/", async (req, res) => {
  try {
    const shortUrls = await shortUrl.find();
    res.render("index", { shortUrls });
  } catch (error) {
    console.error("Error fetching short URLs:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/shortUrls", async (req, res) => {
  try {
    await shortUrl.create({ full: req.body.fullUrl });
    res.redirect("/");
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:shortUrl", async (req, res) => {
  try {
    const url = await shortUrl.findOne({ short: req.params.shortUrl }); 
    if (url) {
      return res.redirect(url.full);
    } else {
      return res.status(404).send('URL not found');
    }
  } catch (error) {
    console.error(`Error redirecting to the original URL`, error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
