fetch('http://localhost:3000/lists')
    .then(res=>{
        if(!res.ok){
            throw res.status;
        }
        return res.json();
    }).then(data=>{
        console.table(data);
}).catch(err=>{
    console.log(err);
})


document.querySelector('#add').onclick = function ()  {
    let fieldEl= document.querySelector('#field')
    let bodyFieldEl= document.querySelector('#bodyfield')



    fetch('http://localhost:3000/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title:fieldEl.value,body:bodyFieldEl.value}),
    }).then(res=>{
        if(!res.ok){
            throw res.status;
        }
        return res.json();
    }).then(data=>{
        console.table(data);
    }).catch(err=>{
        console.log(err);
    })
}