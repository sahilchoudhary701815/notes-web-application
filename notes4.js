map=new Map()
cardId=0
empty=document.getElementById('empty')
checkForEmpty();
element=document.getElementById('cards')
backupButton=document.createElement('button')
backupButton.innerHTML="Backup"
backups=[]
backupButton.addEventListener('click',function(){
element.innerHTML=''
for(i of backups){
    addNew(i,map.get(i),false)
}
})
archiveButton=document.createElement('button')
archiveButton.innerHTML='Archive'
archiveButton.addEventListener('click',function(){
    array=[]
    $.each($("input:checked"),function(){array.push($(this).val())
    })
    localStorage.setItem('archives',array)
    addtoelement(array)})
deleteButton=document.createElement('button')
deleteButton.innerHTML="Delete"
deleteButton.addEventListener('click',function(){
    array=[]
    $.each($("input:checked"),function(){array.push($(this).val())
    })
    deleteelement(array)
    localStorage.setItem('deleted',array)})
showAllButton=document.createElement('button')
showAllButton.innerHTML="Show All"
showAllButton.addEventListener('click',function(){element.innerHTML=''
for([i,j] of map){
    addNew(i,j,true)
}})
notes=new Map()
function checkForEmpty(){
if (map.size==0){
    empty.innerHTML="Nothing to show! use submit to add a new note"
}
else{
    empty.innerHTML=''
    empty.appendChild(backupButton)
    empty.appendChild(archiveButton)
    empty.appendChild(deleteButton)
    empty.appendChild(showAllButton)
}
}
results=document.getElementById('results')
function submitClear(){
        notes=document.getElementById('notes').value
        text=document.getElementById('textbox').value
        if (text!=''){
            map.set(text,notes)
            localStorage.setItem('keys',map);
            addNew(text,notes,true)
            document.getElementById('notes').value=''
            document.getElementById('textbox').value=''
            checkForEmpty()
        }
        else{
            alert('please enter the title')
        }
    }
function addNew(text,notes,bool)
    {
    card=document.createElement('div');
    var cardText=document.createElement('h1')
    var cardNotes=document.createElement('p')
    cardText.innerHTML=text
    cardNotes.innerHTML=notes
    card.id='notetiles'
    card.appendChild(cardText)
    card.appendChild(cardNotes)
    events(card,text)
    if (bool==true){
        addCheckBox(card,text)
    }
    t=new Date()
    date=t.getDate()+'/'+t.getMonth()+"/"+t.getFullYear()+'  '+t.getHours()+':'+t.getMinutes()
    time=document.createElement('p')
    time.innerHTML=date
    card.appendChild(time)
    element.appendChild(card)
    element.appendChild(document.createElement('td'))}
function events(card,text){
    button1=document.createElement('button')
    button2=document.createElement('button')
    button1.innerHTML="Delete"
    button2.innerHTML="Edit"
    card.appendChild(button1)
    card.appendChild(button2)
    button1.addEventListener('click',function(){
            card.remove()
            if (!backups.includes(text)){
                backups.push(text)}
            //map.delete(text)
            localStorage.setItem('keys',map)
            console.log(map.size)
            checkForEmpty()
            })
    button2.addEventListener('click',function(){
        document.getElementById('textbox').value=text    
        document.getElementById('notes').value=map.get(text)
        })
    }
function searchbox(){
        results.textContent=''
        query=document.getElementById('search').value
        for ([text,value] of map){
            if(text.substr(0,query.length)!='' && text.substr(0,query.length)==query){
                res=document.createElement('p')
                res.innerHTML=text
                results.appendChild(res)
            }
        }
    }

function addCheckBox(card,text,bool){
checkBox=document.createElement('input')
checkBox.type='checkbox'
checkBox.value=text
card.appendChild(checkBox)
}
function selectall(array,category)
{$.each($("input:checked"),function(){array.push($(this).val())
//element.appendChild($(this).val())
})
localStorage.setItem(category,array)
console.log(array)
array=[]}
function addtoelement(array){
element.innerHTML=''
for(text of array){
    addNew(text,map.get(text),false)
}
}
function deleteelement(array){
    element.innerHTML=''
    for([i,j] of map){
        if (!array.includes(i)){
            addNew(i,j,true)
        }
        else{
            backups.push(i)
        }
    }
}