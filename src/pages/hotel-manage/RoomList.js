import { Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../../services/axios';
import Layout from '../../layout/default';
import Block from '../../components/Block/Block';
import DataTable from '../../components/DataTable/DataTable';
import { Icon, Select } from '../../components';
import { useEffect, useState } from 'react';
import { Dropdown } from "react-bootstrap";
import { CustomDropdownToggle, CustomDropdownMenu, LinkList, LinkListItem } from "../../components";
import { toast } from 'react-toastify';
function RoomList() {
    const [rooms, setRooms] = useState(null);
    const [roomId,setRoomId] = useState(null)
    const { id } = useParams();
    const [deleteModal, setDeleteModal] = useState(false);
    const getAllRooms = async () => {
        const { data, status } = await axios.get(`Hotel/view/${id}`);
        if (status === 200 || status === 201) {
            setRooms(data?.HotelRooms)
        }
    }
    function closeDeleteModal() {
        setDeleteModal(false);
    }
    useEffect(() => {
        getAllRooms();
    }, [])
    const navigate = useNavigate();
    const roomColumns = [

        {
            name: "Room Name",
            selector: (row) => row.name,
            cell: (row) => (
                <span>{row.name}</span>
            ),
            sortable: true,
            
        },
        {
            name: "Number of rooms",
            selector: (row) => row.no_of_rooms,
            cell: (row) => (
                <span>{row.no_of_rooms}</span>
            ),
            sortable: true,
            hide: "lg",
        },
        {
            name: "Number of beds",
            selector: (row) => row.number_of_beds,
            cell: (row) => (
                <span>{row.number_of_beds}</span>
            ),
            sortable: true,
         
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
                <span className={`badge text-bg-${row.status === "Publish" ? "success-soft"
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
                                    {/* <li>
                                        <Button className="btn-custom" onClick={() => { navigate(`/hotel-manage/rooms-availability/${row._id}`) }}>
                                            <Icon name="calendar"></Icon><span>Availability</span>
                                        </Button>
                                    </li> */}
                                    <li>
                                        <Button className="btn-custom" onClick={() => {navigate(`/hotel-manage/add-room/${id}/${row._id}`)}}>
                                            <Icon name="edit"></Icon><span>Edit</span>
                                        </Button>
                                    </li>
                                    <li>
                                        <Button className="btn-custom" onClick={() => {setRoomId(row?._id); setDeleteModal(true) }}>
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

    const deleteRoom = async () => {
        const {data,status} = await axios.delete(`HotelRoom/delete/${roomId}`)
        if(status == 204){
            getAllRooms()
            toast.success("Room deleted successfully")
            setDeleteModal(false)
        }
    }
    return (
        <Layout title="Rooms" content="container">
            <Block.Head>
                <Block.HeadBetween>
                    <Block.HeadContent>
                        <Block.Title tag="h2">Rooms</Block.Title>
                        <nav>
                            <ol className="breadcrumb breadcrumb-arrow mb-0">
                                <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/hotel-manage/hotels">Hotels</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Rooms</li>
                            </ol>
                        </nav>
                    </Block.HeadContent>
                    <Block.HeadContent>
                        <ul className="d-flex">
                            <li>
                                <Link to={`/hotel-manage/add-room/${id}`}>
                                    <Button className="d-inline-flex" variant="primary">
                                        <Icon name="plus" />
                                        <span>Add Room</span>
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </Block.HeadContent>
                </Block.HeadBetween>
            </Block.Head>
            <Block>
                <Card>
                    <DataTable tableClassName="data-table-head-light table-responsive" data={rooms ?? []} columns={roomColumns} />
                </Card>
            </Block>
            <Modal show={deleteModal} onHide={closeDeleteModal}>
                <div className="modal-content">
                    <div className="modal-body p-5 text-center">
                        <div className="media media-rounded media-xxl media-middle mx-auto text-bg-danger mb-4"><em className="icon ni ni-cross"></em></div>
                        <h3>Are You Sure ?</h3>
                        <p className="small">This room will be removed permanently.</p>
                        <ul className="d-flex gap g-3 justify-content-center pt-1">
                            <li><Button variant="success" onClick={() => {deleteRoom() }}>Yes Delete it!</Button></li>
                            <li><Button variant="danger" className="btn-soft" onClick={closeDeleteModal}>Cancel</Button></li>
                        </ul>
                    </div>
                    <button type="button" className="btn-close position-absolute top-0 end-0 p-3" onClick={closeDeleteModal} aria-label="Close"></button>
                </div>
            </Modal>
        </Layout>
    )
}

export default RoomList;