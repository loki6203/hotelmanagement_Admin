import { Link } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";

import { MediaGroup, Media, MediaText, Image, Icon, CustomDropdownToggle, CustomDropdownMenu, LinkList, LinkListItem } from "../../components";
import { toInitials } from "../../utilities";
import { kImageURL } from "../../services/constants";

// user table column
export const amenityColumns = [
    {
        name: "icon",
        grow: 2,
        selector: (row) => row.icon,
        cell: (row) => (
            <MediaGroup>
                <Media size="md" shape="circle" variant={row.theme && row.theme}>
                { row.icon ? 
                    <Image src={kImageURL +row.icon} staticImage/> : ""
                }
                </Media>
            </MediaGroup>
        ),
    },
    {
        name: "Amenity Name",
        selector: (row) => row.title,
        cell: (row) => (
            <span>{row.title}</span>
        ),
        sortable: true,
        
    },
    {
        name: "status",
        selector: (row) => row.status,
        cell: (row) => (
            <span className={`badge text-bg-${
                row.status === "Active" ? "success-soft" 
                : row.status === "Pending" ? "warning-soft" 
                : row.status === "Inactive" ? "secondary-soft" 
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
                                <LinkListItem to={`/amenities/add-amenity/${row._id}`}>
                                    <Icon name="edit"></Icon><span>Edit</span>
                                </LinkListItem>
                                <li>
                                    <Button className="btn-custom">
                                        <Icon name="trash"></Icon><span>Delete</span>
                                    </Button>
                                </li>
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
const amenities = [
    {
        name: 'Wifi',
        status:'Active',
        avatar: '/images/avatar/a.jpg',
    },
    {
        name: 'AC',
        status:'Active',
        avatar: '/images/avatar/a.jpg',
    },
];

export default amenities;
