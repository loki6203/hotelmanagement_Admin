import { useEffect, useState } from 'react';
import { Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from '../../layout/default';
import Block from '../../components/Block/Block';
import DataTable from '../../components/DataTable/DataTable';
import { Icon } from '../../components';
import  { bookingColumns } from '../../store/users/BookingData';
import axios from '../../services/axios';
import { getCookie } from '../../services/cookieHandling';

function BookingsList() {
const [bookings, setBookings] = useState(null);

const getAllBookingsList = async () => {
    const { data, status } = await axios.get("Booking/list" + (getCookie("role") == "Hotel" ||getCookie("role") == "Staff"  ? `?author_id=${getCookie("author_id")}`: ''));
    if (status === 200 || status === 201) {
        setBookings(data?.results)
    }
}

useEffect(() => {
    getAllBookingsList();
}, [])
return (
    <Layout title="Bookings" content="container">
        <Block.Head>
            <Block.HeadBetween>
                <Block.HeadContent>
                    <Block.Title tag="h2">Bookings</Block.Title>
                    <nav>
                        <ol className="breadcrumb breadcrumb-arrow mb-0">
                            <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Bookings</li>
                        </ol>
                    </nav>
                </Block.HeadContent>
                <Block.HeadContent>
                    <ul className="d-flex">
                        <li>
                            <Link to="/bookings/add-booking">
                                <Button className="d-inline-flex" variant="primary">
                                    <Icon name="plus"/>
                                    <span>Add Booking</span>
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </Block.HeadContent>
            </Block.HeadBetween>
        </Block.Head>
    <Block>
        <Card>
        <DataTable tableClassName="data-table-head-light table-responsive" data={bookings ?? []} columns={bookingColumns}/>
        </Card>
    </Block>
</Layout>
)
}

export default BookingsList;