const OpenAI = require('openai');

const openai =  new OpenAI({
    apiKey: "notforgithub"
})


const readInput = require('readline')

const input = readInput.createInterface({
    input:process.stdin,
    output: process.stdout
})

const createDescription = async(req, res) => {
    const {title} = req.body
    const description = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { 
                role: "user", 
                content: `Generate a desription for a video called ${title}`
            }
        ],
        max_tokens:100
    });
    res.status(200).json({
        description: description.choices[0].message.content
    })
}
const generateImage = async (req, res) => {
    const image = await openai.images.generate({
        model: "dall-e-3",
        prompt: req.body.prompt,
        n: 1,
        size: "1024x1024",
      });
      image_url = image.data[0].url;
      res.json({
        url: image_url
      })
    }
    module.exports = {createDescription, generateImage}