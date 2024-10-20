

function ToggleRow(row)
{
    let project = row.parentElement;
    if (project.dataset.state == "inactive")
    {
        project.dataset.state = "active";
        

        setTimeout(() => {
            // project.scrollIntoView(true);
            window.scrollTo({ top: (project.offsetTop - 70), behavior: 'smooth'});
            console.log('scrolled!');
        }, 100);

    }
    else
    {
        project.dataset.state = "inactive";
    }
}

function OpenRow(row)
{
    // row.style.height = "100vh";
}

function CloseRow(row)
{
    // row.style.height = "70px";
}