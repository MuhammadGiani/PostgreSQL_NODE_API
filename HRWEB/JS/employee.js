const empLink = "https://crispy-robot-4jw6p4jpvjwvf55r6-5005.app.github.dev/employee";

fetch(empLink).then(response=>{
    if(!response.ok){
        throw new Error("Failed to fetch data");
    }
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#employeetable tbody");

    data.forEach(e=>{
        const row = document.createElement("tr");

        row.innerHTML=`
        <td>${e.employee_id}</td>
        <td>${e.first_name}</td>
        <td>${e.last_name}</td>
        <td>${e.email}</td>
        <td>${e.phone_number}</td>
        <td>${e.hire_date}</td>
        <td>${e.job_id}</td>
        <td>${e.salary}</td>
        <td>${e.commission_pct}</td>
        <td>${e.manager_id}</td>
        <td>${e.department_id}</td>
        `;
        tbody.appendChild(row);
    });
}).catch(err=>{
    console.log(err.message);
});