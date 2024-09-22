app.get("/userslist", async (req, res) => {
    try {
        const users = await User.find()
        if (users.length === 0) {
            res.status(404).send("No users found")
        } else {
            console.log(users)
            res.send(users)
        }
        
    } catch(err) {
        res.status(400).send("something went worng")
    }
})

app.delete("/user", async (req, res) => {
    const userId = req.body.userId
    console.log(userId)
    try {
        const user = await User.findByIdAndDelete({_id:userId})
        res.send('deleted successfully')
    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})

app.patch("/user", async (req, res) => {
    const userData = req.body
    const id = req.body.userId
    try{
        const updatedUser = await User.findByIdAndUpdate(id, userData)
        console.log(updatedUser)
        res.send("updated successfully")
    } catch (err) {
        res.status(400).send("something went wrong")
    }
})