import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

import { MediaGroup, Media, MediaText, Image, Icon, CustomDropdownToggle, CustomDropdownMenu, LinkList, LinkListItem, Rating } from "../../components";

// product table column
export const suspendedColumns = [
    {
        name: "products",
        grow: 3,
        selector: (row) => row.name,
        cell: (row) => (
            <MediaGroup>
                <Media to={`/hotel-manage/edit-hotel/${row.id}`} size="md">
                    <Image src={row.src} staticImage/>
                </Media>
                <MediaText>
                    <Link to={`/hotel-manage/edit-hotel/${row.id}`} className="title">{row.name}</Link>
                </MediaText>
            </MediaGroup>
        ),
        sortable: true,
    },
    {
        name: "ID",
        selector: (row) => row.sku,
        cell: (row) => (
            <span>{row.sku}</span>
        ),
        sortable: true,
        
    },
    {
        name: "Rooms",
        selector: (row) => row.qty,
        cell: (row) => (
            <div className="blank">
                {row.qty === "0" ? 
                    <div className="d-flex align-items-center">
                        <span className="text-danger me-1">{row.qty}</span>
                        <span className="badge text-bg-danger-soft">Sold out</span>
                    </div> : 
                    row.qty === "4" ?
                    <div className="d-flex align-items-center">
                        <span className="text-warning me-1">{row.qty}</span>
                        <span className="badge text-bg-warning-soft">Low stock</span>
                    </div> :
                    <span className="small">{row.qty}</span>
                }
            </div>
        ),
        sortable: true,
        hide: "lg",
    },
    {
        name: "price",
        selector: (row) => row.price,
        cell: (row) => (
            <span className="small">${row.price}</span>
        ),
        sortable: true,
        hide: "lg",
    },
    {
        name: "rating",
        selector: (row) => row.rating,
        cell: (row) => (
            <Rating rating={row.rating} />
        ),
        sortable: true,
        hide: "lg",
    },
    {
        name: "status",
        selector: (row) => row.status,
        cell: (row) => (
            <span className={`badge text-bg-${
                row.status === "Live" ? "success-soft" 
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
                                <LinkListItem to={`/hotel-manage/edit-hotel/${row.id}`}>
                                    <Icon name="edit"></Icon><span>Edit</span>
                                </LinkListItem>
                                <LinkListItem to={`/hotel-manage/edit-hotel/${row.id}`}>
                                    <Icon name="trash"></Icon><span>Delete</span>
                                </LinkListItem>
                                <LinkListItem to="/hotel-manage/hotels">
                                    <Icon name="eye"></Icon><span>View Details</span>
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
const suspendedhotels = [
    {
        id:'uid03',
        name: 'Property 2',
        src: '/images/product/c.jpg',
        sku: '0253804',
        qty: '15',
        price: '135.99',
        status: 'Suspended',
        rating: 3
    },
    {
        id:'uid04',
        name: 'Property 3',
        src: '/images/product/d.jpg',
        sku: '0253807',
        qty: '13',
        price: '45.99',
        status: 'Suspended',
        rating: 3
    },
    {
        id:'uid05',
        name: 'Property 4',
        src: '/images/product/e.jpg',
        sku: '0253808',
        qty: '0',
        price: '145.99',
        status: 'Suspended',
        rating: 2
    },
    {
        id:'uid09',
        name: 'Property 8',
        src: '/images/product/i.jpg',
        sku: '0253806',
        qty: '17',
        price: '134.99',
        status: 'Suspended',
        rating: 3
    },
];

export default suspendedhotels;
