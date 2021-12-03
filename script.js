var form=document.getElementById("fomulario");

form.addEventListener('submit',function(func){
    func.preventDefault()
    var search=document.getElementById("busca").value
    var nome= search.split(' ').join('')
    fetch("https://api.github.com/users/"+nome) 
    .then((result)=>result.json())
    .then((data) =>{
        console.log(data)
        document.getElementById("foto").innerHTML=`
            <img src="${data.avatar_url}"/>
            
        `
        document.getElementById("nome").innerHTML=`
            ${data.name}`
            
            let bio='';
            if(data.bio==null){
                bio="Sem bio 🤡"
            }else{
                bio=data.bio;
            }
            document.getElementById("texto").innerHTML=`
            <p>${bio}</p>          
        `
            let local='';
            if(data.location==null){
                local="Sem localização especificada 🗺"
            }else{
                local=data.location;
            }
        
        
        document.getElementById("local").innerHTML=`
            <p>${local}</p>
        `
        document.getElementById("dados").innerHTML=`
        <p><b>Seguidores:</b>   ${data.followers}</p>
        <p><b>Seguindo:</b> ${data.following}</p>
        `
        document.getElementById("link").href="https://github.com/"+nome
           
    })   
    fetch(`https://api.github.com/users/${nome}/repos`)
    
    .then(response=>response.json())
    .then(function(repo_data){
    let text=`<h2 id=heading2>Repositórios de ${repo_data[0].owner.login}</h2>`;
    
    for(x=0;x!=repo_data.length;x++){
        let repo=repo_data[x];
        let descricao='';
        if(repo.description==null){
            descricao="Nenhuma descrição :("
        }else{
            descricao=repo.description;
        }
        text+= `

                <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="card">
                  <div class="card-body">
                    <div id=titulo><h4><b>${repo.name}</b> </h4></div>
                    <div id=descrição>
                        <h5><b>Bio:</b></h5>
                        <p>${descricao}</p>
                        <h5><b>Criada em:</b></h5>
                        <p>${repo.created_at}</p>
                    </div>
                    <a id=link target="_blank" href="${repo.html_url}"> <button id=btreppo><i id=iconeLink class="fas fa-link fa-2x" style="color:black"></i> <p>Ir para o Repositório</p></button></a>
                  </div>
                </div>
              </div>
                
            `
    }
    document.getElementById("repositorios").innerHTML=text;
})
})

