const myMiddle =(req, res, next)=>{
    console.log('print helo world');
    // res.send('bla bal')
    next()
}

const validate=(req, res, next)=>{
    const stock = req.body.stock

    if(stock <1 ){
         return res.json({
            message: 'stock harus lebih dari 0'
        })
    }
    next()
}

module.exports = {
    myMiddle,
    validate
}