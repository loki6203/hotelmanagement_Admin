import { Link } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";

import { MediaGroup, Media, MediaText, Image, Icon, CustomDropdownToggle, CustomDropdownMenu, LinkList, LinkListItem } from "../../components";
import { toInitials } from "../../utilities";
import moment from "moment";

// user table column
export const couponrColumns = [
    {
        name: "Coupon Name",
        selector: (row) => row.name,
        cell: (row) => (
            <span>{row.name}</span>
        ),
        sortable: true,
        
    },
    {
        name: "Coupon Code",
        selector: (row) => row.code,
        cell: (row) => (
            <span>{row.code}</span>
        ),
        sortable: true,
        
    },
    {
        name: "Coupon Amount",
        selector: (row) => row.amount,
        cell: (row) => (
            <span>{row.amount}</span>
        ),
        sortable: true,
        
    },
    {
        name: "End Date",
        selector: (row) => row.endate,
        cell: (row) => (
            <span>{moment(row.endate).format("DD MMM YYYY")}</span>
        ),
        sortable: true,
        
    },
    {
        name: "Discount Type",
        selector: (row) => row.discount_type,
        cell: (row) => (
            <span>{row.discount_type}</span>
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
        name: "Minimum spend",
        selector: (row) => row.minimumspend,
        cell: (row) => (
            <span>
            { row.minimumspend}
            </span>
        ),
        sortable: true,
    },
    {
        name: "Maximum spend",
        selector: (row) => row.maximumspend,
        cell: (row) => (
            <span>
            { row.maximumspend}
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
                                <LinkListItem to={`/coupon/add-coupon/${row._id}`}>
                                    <Icon name="edit"></Icon><span>Edit</span>
                                </LinkListItem>
                                <li>
                                        <Button className="btn-custom" onClick={""}>
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
const coupons = [
    {
        code:'uid01',
        name: 'FLAT50',
        amount:'1000',
        end:'22-22-2022',
        status:'Active',
    },
];

export default coupons;
