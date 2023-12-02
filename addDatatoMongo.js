const express = require('express');
const mongoose = require('mongoose');

const http_server = express()
http_server.use(express.json())
http_server.use(express.static(__dirname))

http_server.get('/', (req, res) => {
    res.sendFile(__dirname + '/shop.html')
})

http_server.get('/branches', async (req, res) => {
    res.send(await getbranches());
})


http_server.get('/items', async (req, res) => {
    try {
        const result = await item.aggregate([
            {
                $lookup: {
                    from: "branch",
                    localField: "branch",
                    foreignField: "_id",
                    as: "branchesName"
                }
            },
            {
                $project: {
                    _id: "$_id",
                    name: "$name",
                    cost: "$cost",
                    img: "$img",
                    category: "$category",
                    color: "$color",
                    branch: {
                        city: "$branchesName.city",
                        street: "$branchesName.street"
                    }
                }
            }
        ]);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

http_server.get('/average', async (req, res) => {
    try {
        const result = await item.aggregate([
            { $group: { _id: "$category", averagePrice: { $avg: "$cost" } } }
        ]);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

http_server.post('/insertbranch', (req, res) => {
    add_branch_to_db(req.body)
    res.end()
})

http_server.post('/updatebranch',async (req, res) => {
    update_branch(req.body)
    res.end()
})
http_server.post('/deletebranch',async (req, res) => {
    delete_branch(req.body)
    res.end()
})

http_server.post('/deleteitem',async (req, res) => {
    delete_item(req.body)
    res.end()
})
http_server.post('/updateitem',async (req, res) => {
    update_item(req.body)
    res.end()
})

http_server.post('/insertitems', (req, res) => {
    add_item_to_db(req.body)
    res.end()
})

http_server.listen(8080)

mongoose.connect('mongodb://127.0.0.1:27017/shop', { useUnifiedTopology: true });
mongoose.set({ strictQuery: false })
const db = mongoose.connection;
db.on('eroro', console.error.bind(console, 'connection error: '));
db.once('open', function () {
    console.log('connection open');
});

const branches = new mongoose.Schema({
    id: Number,
    city: String,
    street: String,
    phone: String,
    opening_hours: String,
    email: String
});


const items = new mongoose.Schema({
    name: String,
    cost: Number,
    img: Object,
    category: String,
    color: String,
    branch: Array
});

let item;
let branch;

async function init() {
    item = mongoose.model('item', items);
    await item.deleteMany({})

    branch = mongoose.model('branch', branches);

    if ((await getbranches()).length == 0) {
        const branc1 = new branch({ id: '1', city: 'bnei brak', street: 'Ezra 12', phone: '035797654', opening_hours: '10:00-21:00', email: 'shopbb@shop.com' });
        const branc2 = new branch({ id: '2', city: 'jerusalem', street: 'Neria 35', phone: '025797653', opening_hours: '10:00-21:00', email: 'shopjr@shop.com' });
        branc1.save()
        branc2.save()
    }

    const kippah1 = new item({ name: 'Elegant Kippah', cost: 27, img: 'https://haine.co.il/wp-content/uploads/2021/01/IMG_7021-2-scaled-scaled.jpg', category: 'kippahs', color: 'silver', branch: ['1', '2'] });
    const kippah2 = new item({ name: 'Car Kippah', cost: 22, img: 'https://haine.co.il/wp-content/uploads/2022/08/PHOTO-2022-07-31-14-51-39-3.jpg', category: 'kippahs', color: 'blue', branch: ['1', '2'] });
    const kippah3 = new item({ name: 'Leather Kippah', cost: 28, img: 'https://haine.co.il/wp-content/uploads/2021/08/a115.png', category: 'kippahs', color: 'blue', branch: ['1', '2'] });
    const kippah4 = new item({ name: 'Lego Kippah', cost: 35, img: 'https://haine.co.il/wp-content/uploads/2022/07/20220727_122356-scaled.jpg', category: 'kippahs', color: 'blue', branch: ['1', '2'] });
    const kippah5 = new item({ name: 'Bicycle Kippah', cost: 40, img: 'https://haine.co.il/wp-content/uploads/2023/03/IMG-20230312-WA0051.jpg', category: 'kippahs', color: 'blue', branch: ['1', '2'] });
    kippah1.save()
    kippah2.save()
    kippah3.save()
    kippah4.save()
    kippah5.save()




    const headkerchief1 = new item({ name: 'Pink headkerchief', cost: 25, img: 'https://haine.co.il/wp-content/uploads/2023/03/PHOTO-2023-10-25-14-56-09-1-300x300.jpg', category: 'headkerchiefes', color: 'pink', branch: ['1', '2'] });
    const headkerchief2 = new item({ name: 'Gray headkerchief', cost: 25, img: 'https://haine.co.il/wp-content/uploads/2023/03/PHOTO-2023-10-25-14-56-07-300x300.jpg', category: 'headkerchiefes', color: 'gray', branch: ['1', '2'] });
    const headkerchief3 = new item({ name: 'Branded headkerchief', cost: 30, img: 'https://haine.co.il/wp-content/uploads/2021/04/00152-450x450.png', category: 'headkerchiefes', color: 'blue', branch: ['1', '2'] });
    const headkerchief4 = new item({ name: 'Dots headkerchief', cost: 28, img: 'https://haine.co.il/wp-content/uploads/2021/02/117-450x450.png', category: 'headkerchiefes', color: 'blue', branch: ['1', '2'] });
    const headkerchief5 = new item({ name: 'Spotted headkerchief', cost: 30, img: 'https://haine.co.il/wp-content/uploads/2022/01/WhatsApp-Image-2022-01-24-at-10.42.39-450x450.jpeg', category: 'headkerchiefes', color: 'pink', branch: ['1', '2'] });
    headkerchief1.save()
    headkerchief2.save()
    headkerchief3.save()
    headkerchief4.save()
    headkerchief5.save()


    const bow1 = new item({ name: 'Flower bow', cost: 35, img: 'https://haine.co.il/wp-content/uploads/2023/03/PHOTO-2023-03-15-14-26-08-300x300.jpg', category: 'bows', color: 'brown', branch: ['1', '2'] });
    const bow2 = new item({ name: 'Pearles bow', cost: 40, img: 'https://haine.co.il/wp-content/uploads/2023/07/PHOTO-2023-07-19-14-30-14-300x300.jpg', category: 'bows', color: 'silver', branch: ['1', '2'] });
    const bow3 = new item({ name: 'Fayettes bow', cost: 25, img: 'https://haine.co.il/wp-content/uploads/2023/03/PHOTO-2023-03-16-12-38-08-5-450x450.jpg', category: 'bows', color: 'silver', branch: ['1', '2'] });
    const bow4 = new item({ name: 'Elegant black bow', cost: 20, img: 'https://haine.co.il/wp-content/uploads/2023/03/PHOTO-2023-03-16-12-38-08-12-450x450.jpg', category: 'bows', color: 'black', branch: ['1', '2'] });
    const bow5 = new item({ name: 'Elegant pink bow', cost: 20, img: 'https://haine.co.il/wp-content/uploads/2023/03/PHOTO-2023-03-16-12-38-08-15-450x450.jpg', category: 'bows', color: 'pink', branch: ['1', '2'] });
    bow1.save()
    bow2.save()
    bow3.save()
    bow4.save()
    bow5.save()


    const sock1 = new item({ name: 'Boy disney socks', cost: 20, img: 'https://haine.co.il/wp-content/uploads/2023/08/PHOTO-2023-08-31-12-50-16-1-450x450.jpg', category: 'socks', color: 'blue', branch: ['1', '2'] });
    const sock2 = new item({ name: 'Girl disney socks', cost: 20, img: 'https://haine.co.il/wp-content/uploads/2023/08/PHOTO-2023-08-31-12-50-19-450x450.jpg', category: 'socks', color: 'pink', branch: ['1', '2'] });
    const sock3 = new item({ name: 'Gray knit socks', cost: 25, img: 'https://haine.co.il/wp-content/uploads/2022/11/PHOTO-2023-11-13-13-28-29-1-300x300.jpg', category: 'socks', color: 'gray', branch: ['1', '2'] });
    const sock4 = new item({ name: 'white knit socks', cost: 25, img: 'https://haine.co.il/wp-content/uploads/2023/11/PHOTO-2023-11-13-10-33-21-1-300x300.jpg', category: 'socks', color: 'white', branch: ['1', '2'] });
    const sock5 = new item({ name: 'Elegant socks', cost: 27, img: 'https://haine.co.il/wp-content/uploads/2023/03/PHOTO-2023-03-16-12-38-08-20-450x450.jpg', category: 'socks', color: 'black', branch: ['1', '2'] });
    sock1.save()
    sock2.save()
    sock3.save()
    sock4.save()
    sock5.save()

}

init();

async function getbranches() {
    return await branch.find();
}

function add_branch_to_db(data) {
    const name = new branch({ city: data.city, street: data.street, phone: data.phone, opening_hours: data.opening_hours, email: data.email, branch: data.branch });
    name.save()
}

async function update_branch(data) {
    const  id  = data.id;
    let result =await branch.findByIdAndDelete(id);
    const name = new branch({ city: data.city, street: data.street, phone: data.phone, opening_hours: data.opening_hours, email: data.email, branch: data.branch });
    name.save()
}
async function delete_branch(data) {
    const  id  = data.id;
    let result =await branch.findByIdAndDelete(id);
}

async function delete_item(data){
    const  id  = data.id;
    let result =await item.findByIdAndDelete(id);
}

async function update_item(data) {
    const  id  = data.id;
    let result = await item.findByIdAndDelete(id);
    const name = new item({ name: data.name, cost: data.cost, img: data.img, category: data.category, color: data.color, branch: data.branch });
    name.save()
}

function add_item_to_db(data) {
    const name = new item({ name: data.name, cost: data.cost, img: data.img, category: data.category, color: data.color, branch: data.branch });
    name.save()
}
