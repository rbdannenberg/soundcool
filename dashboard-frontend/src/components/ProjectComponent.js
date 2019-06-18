import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderProjectMenuItem ({project, onClick}) {
    return (
        <Card>
            <Link to={`/projectmenu/${project.id}`} >
                <CardImg width="100%" src={project.image} alt={project.name} />
                <CardImgOverlay>
                    <CardTitle>{project.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

const ProjectMenu = props => {
    const projectmenu = props.projects.map(project => {
        return (
            <div key={project.id} className="col-12 col-md-5 m-1">
                <RenderProjectMenuItem project={project} />
            </div>
        )
    });

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>ProjectMenu</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>ProjectMenu</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                {projectmenu}
            </div>
        </div>
    );
}

export default ProjectMenu;