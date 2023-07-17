import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

import { MediaGroup, Media, MediaText, Image, Icon, CustomDropdownToggle, CustomDropdownMenu, LinkList, LinkListItem } from "../../components";
import { toInitials } from "../../utilities";
import moment from "moment";

// user table column
export const bookingColumns = [
    {
        name: "Booking id",
        selector: (row) => row.booking_id,
        cell: (row) => (
            <span>{row.booking_id}</span>
        ),
    },
    // {
    //     name: "Hotel",
    //     selector: (row) => JSON.parse(row.hotel_infomration)[0]?.name,
    //     cell: (row) => (
    //         <span>{JSON.parse(row.hotel_infomration)[0]?.name}</span>
    //     ),
    // },
    {
        name: "Number of Rooms",
        selector: (row) => row.no_of_rooms,
        cell: (row) => (
            <span>{row.no_of_rooms}</span>
        ),
        sortable: true,
        hide: "lg",
    },
    {
        name: "Checkin data",
        selector: (row) => row.date,
        cell: (row) => (
            <span> {moment(row.checkin_date).format("DD/MM/YYYY HH:MM")}</span>
        ),
        sortable: true,
        hide: "lg",
    },
    {
        name: "Checkout data",
        selector: (row) => row.checkout_date,
        cell: (row) => (
            <span> {moment(row.checkout_date).format("DD/MM/YYYY HH:MM")}</span>
        ),
        sortable: true,
        hide: "lg",
    },
    {
        name: "Number of Adults",
        selector: (row) => row.no_of_adults,
        cell: (row) => (
            <span>{row.no_of_adults}</span>
        ),
        sortable: true,
        hide: "lg",
    },
    {
        name: "Number of Childrens",
        selector: (row) => row.no_of_chlidrens,
        cell: (row) => (
            <span>{row.no_of_chlidrens}</span>
        ),
        sortable: true,
        hide: "lg",
    },
    {
        name: "Paid",
        selector: (row) => row.total_paid,
        cell: (row) => (
            <span> ₹{row.total_paid}</span>
        ),
        sortable: true,
        hide: "lg",
    },
    {
        name: "status",
        selector: (row) => row.booking_status,
        cell: (row) => (
            <span className={`badge text-bg-${
                row.booking_status === "Confirmed" ? "success-soft"
                : row.booking_status === "Refunded" ? "warning-soft"
                : row.booking_status === "Failed" ? "secondary-soft"
                : row.booking_status === "Pending" ? "warning-soft"
                : row.booking_status === "Processing" ? "warning-soft"
                : row.booking_status === "Cancelled" ? "secondary-soft"
                : "primary-soft"}`
            }>
            {row.booking_status ? row.booking_status : ''}
            </span>
        ),
        sortable: true,
    },
    {
        name: "Payment status",
        selector: (row) => row.payment_status,
        cell: (row) => (
            <span className={`badge text-bg-${
                row.payment_status === "Success" ? "success-soft" 
                : row.payment_status === "Processing" ? "warning-soft" 
                : row.payment_status === "Failed" ? "secondary-soft" 
                : "primary-soft"}`
            }>
            {row.payment_status ? row.payment_status : ''}
            </span>
        ),
        sortable: true,
    },
    // {
    //     name: "action",
    //     cell: (row) => (
    //         <div className="text-end w-100">
    //             <Dropdown>
    //                 <Dropdown.Toggle size="sm" as={CustomDropdownToggle} className="btn btn-sm btn-icon btn-zoom me-n1">
    //                     <Icon name="more-v"></Icon>
    //                 </Dropdown.Toggle>
    //                 <Dropdown.Menu className="dropdown-menu-sm" as={CustomDropdownMenu} align="end">
    //                     <div className="dropdown-content py-1">
    //                         <LinkList className="link-list-hover-bg-primary link-list-md">
    //                             <LinkListItem to={`/hotel-manage/room-edit`}>
    //                                 <Icon name="edit"></Icon><span>Edit</span>
    //                             </LinkListItem>
    //                         </LinkList>
    //                     </div>
    //                 </Dropdown.Menu>
    //             </Dropdown>
    //         </div>
    //     ),
    //     sortable: false,
    //     
    // },
    
];

// users data
const bookings = [
            {
                hotel: "Property 1",
                room: "Standard room",
                date: "26-12-8899",
                execution: `Check in : 03/20/2023 Check out : 03/26/2023 Duration : 6 nights`,
                total: "1122",
                paid: "0",
                balance: "1122",
                remain: "1122",
                status: "Pending"
            },
];

export default bookings;
