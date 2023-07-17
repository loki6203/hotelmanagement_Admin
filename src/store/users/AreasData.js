import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

import { MediaGroup, Media, MediaText, Image, Icon, CustomDropdownToggle, CustomDropdownMenu, LinkList, LinkListItem } from "../../components";
import { toInitials } from "../../utilities";

// user table column
export const areaColumns = [
 
    {
        name: "Name",
        selector: (row) => row.title,
        cell: (row) => (
            <span>{row.title}</span>
        ),
        sortable: true,
        
    },
    {
        name: "State",
        selector: (row) => row.location_state_id.title,
        cell: (row) => (
            <span>{row.location_state_id.title}</span>
        ),
        sortable: true,
        hide: "lg",
    },
    {
        name: "description",
        selector: (row) => row.description,
        cell: (row) => (
            <span> {row.description}</span>
        ),
        sortable: true,
        hide: "lg",
    },
    {
        name: "status",
        selector: (row) => row.status,
        cell: (row) => (
            <span className={`badge text-bg-${
                row.status === "Active" ? "success-soft" 
                : row.status === "Inactive" ? "warning-soft" 
                : "primary-soft"}`
            }>
            {row.status ? row.status : 'General'}
            </span>
        ),
        sortable: true,
    },
    {
        name: "action",
        cell: (row) => (
            <div className="text-end w-100">
                <Dropdown>
                    <Dropdown.Toggle size="sm" as={CustomDropdownToggle} className="btn btn-sm btn-icon btn-zoom me-n1">
                        <Icon name="more-v"></Icon>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-sm" as={CustomDropdownMenu} align="end">
                        <div className="dropdown-content py-1">
                            <LinkList className="link-list-hover-bg-primary link-list-md">
                                <LinkListItem to={`/location/area-add`}>
                                    <Icon name="edit"></Icon><span>Edit</span>
                                </LinkListItem>
                                <LinkListItem to={`/location/area-add`}>
                                    <Icon name="trash"></Icon><span>Delete</span>
                                </LinkListItem>
                            </LinkList>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        ),
        sortable: false,
        
    },
    
];


export const areaColumns2 = [
 
    {
        name: "Name",
        selector: (row) => row.title,
        cell: (row) => (
            <span>{row.title}</span>
        ),
        sortable: true,
        
    },

    {
        name: "description",
        selector: (row) => row.description,
        cell: (row) => (
            <span> {row.description}</span>
        ),
        sortable: true,
        hide: "lg",
    },
    {
        name: "status",
        selector: (row) => row.status,
        cell: (row) => (
            <span className={`badge text-bg-${
                row.status === "Active" ? "success-soft" 
                : row.status === "Inactive" ? "warning-soft" 
                : "primary-soft"}`
            }>
            {row.status ? row.status : 'General'}
            </span>
        ),
        sortable: true,
    },
    {
        name: "action",
        cell: (row) => (
            <div className="text-end w-100">
                <Dropdown>
                    <Dropdown.Toggle size="sm" as={CustomDropdownToggle} className="btn btn-sm btn-icon btn-zoom me-n1">
                        <Icon name="more-v"></Icon>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-sm" as={CustomDropdownMenu} align="end">
                        <div className="dropdown-content py-1">
                            <LinkList className="link-list-hover-bg-primary link-list-md">
                                {/* <LinkListItem to={`/location/area-add`}>
                                    <Icon name="edit"></Icon><span>Edit</span>
                                </LinkListItem> */}
                                <LinkListItem to={`/location/area-add`}>
                                    <Icon name="trash"></Icon><span>Delete</span>
                                </LinkListItem>
                            </LinkList>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        ),
        sortable: false,
        
    },
    
];
// users data
const rooms = [
            {
                area: "Ammerpet",
                location: "Hyderabad",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                status: "Active"
            },
];

export default rooms;
