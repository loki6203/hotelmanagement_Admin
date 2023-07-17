import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

import { MediaGroup, Media, MediaText, Image, Icon, CustomDropdownToggle, CustomDropdownMenu, LinkList, LinkListItem } from "../../components";
import { toInitials } from "../../utilities";

// user table column
export const roomColumns = [
 
    {
        name: "Room Name",
        selector: (row) => row.name,
        cell: (row) => (
            <span>{row.name}</span>
        ),
        sortable: true,
        
    },
    {
        name: "Number",
        selector: (row) => row.number,
        cell: (row) => (
            <span>{row.number}</span>
        ),
        sortable: true,
        hide: "lg",
    },
    {
        name: "price",
        selector: (row) => row.price,
        cell: (row) => (
            <span> ₹{row.price}</span>
        ),
        sortable: true,
        hide: "lg",
    },
    {
        name: "status",
        selector: (row) => row.status,
        cell: (row) => (
            <span className={`badge text-bg-${
                row.status === "Publish" ? "success-soft" 
                : row.status === "Pending" ? "warning-soft" 
                : row.status === "Draft" ? "secondary-soft" 
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
                                <LinkListItem to={`/hotel-manage/rooms-availability`}>
                                <Icon name="calendar"></Icon><span>Availability</span>
                                </LinkListItem>
                                <LinkListItem to={`/hotel-manage/room-edit`}>
                                    <Icon name="edit"></Icon><span>Edit</span>
                                </LinkListItem>
                                <LinkListItem to={`/user-manage/user-edit`}>
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
                name: "Standard room",
                number: "2",
                price: "1122",
                status: "Publish"
            },
            {
                name: "Standard room",
                number: "2",
                price: "1122",
                status: "Publish"
            },{
                name: "Standard room",
                number: "2",
                price: "1122",
                status: "Publish"
            },{
                name: "Standard room",
                number: "2",
                price: "1122",
                status: "Publish"
            },{
                name: "Standard room",
                number: "2",
                price: "1122",
                status: "Publish"
            },{
                name: "Standard room",
                number: "2",
                price: "1122",
                status: "Publish"
            },
];

export default rooms;
