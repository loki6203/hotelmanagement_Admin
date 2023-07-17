import { useEffect, useState } from 'react';
import { Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from '../../services/axios';
import Layout from '../../layout/default';
import Block from '../../components/Block/Block';
import DataTable from '../../components/DataTable/DataTable';
import { Icon, Select } from '../../components';
import UsersData, { userColumns } from '../../store/users/UsersData';
import { registerOwnerSchema } from '../../services/validations';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { getCookie } from '../../services/cookieHandling';
import { Dropdown } from "react-bootstrap";

import { CustomDropdownToggle, CustomDropdownMenu, LinkList, LinkListItem } from "../../components";
function UserListPage() {
    const [deleteModal, setdeleteModal] = useState(false);
const navigate = useNavigate()
    const handleShowModal = () => setdeleteModal(true);
    const handleCloseModal = () => setdeleteModal(false);
    const [roomId, setRoomId] = useState(null)
    const [users, setUsers] = useState(null);
    const getAllUsers = async () => {
        const { data, status } = await axios.get(`Author/list?role=${getCookie("role") == "Superadmin" ? "User" : "Staff"}` + (getCookie("role") == "Hotel" ? `&created_by=${getCookie("author_id")}` : ''));
        if (status === 200 || status === 201) {
            setUsers(data?.results)
        }
    }
    useEffect(() => {
        getAllUsers();
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerOwnerSchema),
    });

    const deleteUser = async () => {
        const { data, status } = await axios.delete(`Author/delete/${roomId}`)
        if (status == 204) {
            toast.success(`${getCookie("role") == "Superadmin" ? "Users" : "Staff"} deleted successfully`)
            getAllUsers();
            setdeleteModal(false)
        }
    }
    const ownerColumns = [
        {
            name: "First name",
            grow: 2,
            selector: (row) => row.first_name,
            sortable: true,
        },
        {
            name: "Last name",
            grow: 2,
            selector: (row) => row.last_name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            cell: (row) => (
                <span>{row.email}</span>
            ),
            sortable: true,
        },
        {
            name: "Phone number",
            selector: (row) => row.phonenumber,
            cell: (row) => (
                <span>{row.phonenumber}</span>
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
                                    <LinkListItem to={`/user-manage/user-edit/${row._id}`}>
                                        <Icon name="edit"></Icon><span>Edit</span>
                                    </LinkListItem>
                                    <LinkListItem to={`/user-manage/user-edit/${row._id}`}>
                                        <Icon name="eye"></Icon><span>View Details</span>
                                    </LinkListItem>
                                    <Button className="btn-custom"  onClick={() => {setRoomId(row._id);handleShowModal()}}>
                                        <Icon name="trash"></Icon><span>Delete</span>
                                    </Button>
                                </LinkList>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            ),
            sortable: false,
            
        },
        
    ];
    return (
        <Layout title="Customers List" content="container">
            <Block.Head>
                <Block.HeadBetween>
                    <Block.HeadContent>
                        <Block.Title tag="h2">{getCookie("role") == "Superadmin" ? "Customers" : "Staff"} List</Block.Title>
                        <nav>
                            <ol className="breadcrumb breadcrumb-arrow mb-0">
                                <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{getCookie("role") == "Superadmin" ? "Customers" : "Staff"}</li>
                            </ol>
                        </nav>
                    </Block.HeadContent>
                    <Block.HeadContent>
                        <ul className="d-flex">
                            <li>
                                <Button className="d-md-none" size="md" variant="primary" onClick={() => {navigate("/user-manage/user-edit")}}>
                                    <Icon name="plus" />
                                    <span>Add</span>
                                </Button>
                            </li>
                            <li>
                                <Button className="d-none d-md-inline-flex" variant="primary" onClick={() => {navigate("/user-manage/user-edit")}}>
                                    <Icon name="plus" />
                                    <span>Add {getCookie("role") == "Superadmin" ? "Customers" : "Staff"}</span>
                                </Button>
                            </li>
                            
                        </ul>
                    </Block.HeadContent>
                </Block.HeadBetween>
            </Block.Head>

            <Block>
                <Card>
                    {users && <DataTable tableClassName="data-table-head-light table-responsive" data={users} search={"first_name"} columns={ownerColumns} />}
                </Card>
            </Block>

            <Modal show={deleteModal} onHide={handleCloseModal}>
                <div className="modal-content">
                    <div className="modal-body p-5 text-center">
                        <div className="media media-rounded media-xxl media-middle mx-auto text-bg-danger mb-4"><em className="icon ni ni-cross"></em></div>
                        <h3>Are You Sure ?</h3>
                        <p className="small">This room will be removed permanently.</p>
                        <ul className="d-flex gap g-3 justify-content-center pt-1">
                            <li><Button variant="success" onClick={() => { deleteUser() }}>Yes Delete it!</Button></li>
                            <li><Button variant="danger" className="btn-soft" onClick={handleCloseModal}>Cancel</Button></li>
                        </ul>
                    </div>
                    <button type="button" className="btn-close position-absolute top-0 end-0 p-3" onClick={handleCloseModal} aria-label="Close"></button>
                </div>
            </Modal>

        </Layout>
    )
}

export default UserListPage;