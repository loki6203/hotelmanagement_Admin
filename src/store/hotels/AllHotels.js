import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

import { MediaGroup, Media, MediaText, Image, Icon, CustomDropdownToggle, CustomDropdownMenu, LinkList, LinkListItem, Rating } from "../../components";
import { getCookie } from "../../services/cookieHandling";

// product table column
export const allColumns = [
    {
        name: "Title",
        grow: 3,
        selector: (row) => row.title,
        sortable: true,
    },
    {
        name: "Address",
        selector: (row) => row.real_address,
        cell: (row) => (
            <span>{row.real_address}</span>
        ),
        
    },
    {
        name: "price",
        selector: (row) => row.price,
        cell: (row) => (
            <span className="small">{row.price}</span>
        ),
        sortable: true,
    },
    {
        name: "rating",
        selector: (row) => row.rating_standard,
        cell: (row) => (
            <Rating rating={row.rating_standard} />
        ),
        sortable: true,
    },
    {
        name: "status",
        selector: (row) => row.status,
        cell: (row) => (
            <span className={`badge text-bg-${row.status === "Live" ? "success-soft"
                    : row.status === "Pending" ? "info-soft"
                        : row.status === "Suspended" ? "danger-soft"
                            : "secondary-soft"}`
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
                                <LinkListItem to={`/hotel-manage/add-hotel/${row._id}`}>
                                    <Icon name="edit"></Icon><span>Edit</span>
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

// products data
const hotels = [
    {
        name: 'Property 1',
        src: '/images/product/a.jpg',
        location: 'Hyderabad',
        author: 'Prakash',
        date: '26-12-1997',
        rating: 5,
        status: 'Live',
    },
    {
        name: 'Property 1',
        src: '/images/product/a.jpg',
        location: 'Hyderabad',
        author: 'Prakash',
        date: '26-12-1997',
        rating: 5,
        status: 'Live',
    },
    {
        name: 'Property 1',
        src: '/images/product/a.jpg',
        location: 'Hyderabad',
        author: 'Prakash',
        date: '26-12-1997',
        rating: 5,
        status: 'Live',
    },

    {
        name: 'Property 1',
        src: '/images/product/a.jpg',
        location: 'Hyderabad',
        author: 'Prakash',
        date: '26-12-1997',
        rating: 5,
        status: 'Live',
    },
    {
        name: 'Property 1',
        src: '/images/product/a.jpg',
        location: 'Hyderabad',
        author: 'Prakash',
        date: '26-12-1997',
        rating: 5,
        status: 'Live',
    },
];

export default hotels;
