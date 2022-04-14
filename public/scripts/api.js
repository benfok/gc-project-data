
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/vnd.gathercontent.v2+json',
    Authorization: 'Basic YmVuamFtaW4uZm9rQHZhaWxyZXNvcnRzLmNvbToyNzQ2OTgxNy1lMmUzLTQ3MDctOTM3MS0wMGIxOGE0YWQwMTE='
  }
};

const folder = {
  uuid: '124d3a34-b07c-45b6-92f1-f1a6cac17c99',
  name: 'Vail'
};

const getProject = async (id, array) => {

  // await fetch(`https://api.gathercontent.com/projects/${id}/folders`, options)
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(err => console.error(err));
  for (let i = 0; i < array.length; i++) {

    await fetch(`https://api.gathercontent.com/projects/${id}/items?include=folder_name,status_name,assignee_full_names&folder_uuid=${array[i].uuid}`, options)
      .then(function(response){
        if (!response.ok) {
            alert('Error: ' + response.statusText);
            } 
        return response.json();    
      })
      .then(async function (data){
          // console.log(data);
          await resortHtml(array[i].name);
          return listData(array[i].name.toLowerCase(), data);
          // await createChart(array[i].name.toLowerCase(), array);
          })
      .then(response => createChart(response.resort, response.chartArray))
      .catch(err => console.error(err));
  }

}

document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault();
    console.log(event);
    const id = document.getElementById('projectId').value;
    getProject(id, resortFolders);
})