import React,{ useState, useRef, useLayoutEffect } from 'react'
import Layout from '../../layout/default';

import {Icon, Block,BlockTitle, BlockHead, BlockHeadBetween, BlockHeadContent, DatePicker, TimePicker } from '../../components';

import { today, yesterday, currentMonth, monthList} from '../../utilities';
import toTwelve from '../../utilities/toTwelve'

import {Popover,OverlayTrigger, Modal, Row, Col,Button, Card, Form} from 'react-bootstrap'
import Choices from 'choices.js';

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import listPlugin from '@fullcalendar/list'
import { Link } from 'react-router-dom';

let eventData = [
    {
        id: 'default-event-id-' + Math.floor(Math.random()*9999999),
        title: '₹2000 x 5',
        start: currentMonth + '-01',
        end: currentMonth + '-02',
        className: "fc-event-primary",
    },
]

function renderEventContent(eventInfo) {
  const timeText = eventInfo.timeText, 
        title = eventInfo.event._def.title, 
        description = eventInfo.event._def.extendedProps.description, 
        view = eventInfo.view.type,
        popover = (
          <Popover className='event-popover'>
            <Popover.Header as="h3">{title}</Popover.Header>
            <Popover.Body>{description}</Popover.Body>
          </Popover>
        )
  return (
    <>
      {timeText && (view === 'dayGridMonth') && <div className="fc-daygrid-event-dot"></div>}
      {timeText && <div className="fc-event-time">{timeText}</div>}
      <div className="fc-event-title">{title}</div>
      <OverlayTrigger trigger={['hover','focus']} placement="top" overlay={popover}>
        <div className='fc-event-popover' style={{position:'absolute', inset: '0'}}></div>
      </OverlayTrigger>
      
    </>
  )
}

function EventCategory({value, ...props}) {
    const eventCategory = useRef(null);
    useLayoutEffect( ()=> {
        let choicesCat = new Choices(eventCategory.current, {
            silent: true,
            allowHTML: false,
            searchEnabled: true,
            placeholder: true,
            placeholderValue: null,
            searchPlaceholderValue: 'Search',
            shouldSort: false,
            choices: [
                { value: 'event-success', label: 'Available' },
                { value: 'event-dark', label: 'Blocked' },
            ],
            callbackOnCreateTemplates: function(template) {
                return{
                    item: ({ classNames }, data) => {
                        return template(`
                        <div class="${classNames.item} ${
                        data.highlighted
                            ? classNames.highlightedState
                            : classNames.itemSelectable
                        } ${
                        data.placeholder ? classNames.placeholder : ''
                        }" data-item data-id="${data.id}" data-value="${data.value}" ${
                        data.active ? 'aria-selected="true"' : ''
                        } ${data.disabled ? 'aria-disabled="true"' : ''}>
                            <span class="fc-select-dot fc-${data.value}"></span> ${data.label}
                        </div>
                        `);
                    },
                    choice: ({ classNames }, data) => {
                        return template(`
                        <div class="${classNames.item} ${classNames.itemChoice} ${
                        data.disabled ? classNames.itemDisabled : classNames.itemSelectable
                        }" data-select-text="${this.config.itemSelectText}" data-choice ${
                        data.disabled
                            ? 'data-choice-disabled aria-disabled="true"'
                            : 'data-choice-selectable'
                        } data-id="${data.id}" data-value="${data.value}" ${
                        data.groupId > 0 ? 'role="treeitem"' : 'role="option"'
                        }>
                            <span class="fc-select-dot fc-${data.value}"></span> ${data.label}
                        </div>
                        `);
                    },
                }
            }
        });
        choicesCat.setChoiceByValue(value);
    })
  return (
    <Form.Select ref={eventCategory} {...props}></Form.Select>
  )
}

function RoomAvailability() {
    // eslint-disable-next-line 
    const modalForm = useRef(null);
    const selectEvent = []
    const formDefault = {
        opened: false
    }
    const [events, setEvents] = useState(eventData);
    const [selectedEvent, setSelectedEvent] = useState(selectEvent);
    const [previewModal, setPreviewModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [formModal, setFormModal] = useState(formDefault);

    function closePreviewModal(){
      setPreviewModal(false);
    }

    function openDeleteModal(){
      setPreviewModal(false);
      setDeleteModal(true);
    }

    function closeDeleteModal(){
      setDeleteModal(false);
      setSelectedEvent(selectEvent);
    }

    function openEditModal(){
        setPreviewModal(false);
        const updateFormModal = {...formModal, 
            opened:true,
            modalTitle: "Edit Event",
            action: 'edit',
            eventTitle: selectedEvent.title,
            eventStartTime: selectedEvent.startTime,
            eventStartDate: selectedEvent.startDate,
            eventEndTime: selectedEvent.endTime,
            eventEndDate: selectedEvent.endDate,
            eventDescription:selectedEvent.description,
            eventCategory:selectedEvent.className,
        }

        setFormModal(updateFormModal);
    }

    function closeFormModal(){
        const updateFormModal = {...formModal, opened:false}
        setFormModal(updateFormModal);
    }

    const globalFcStyle = `
        .fc-list-event-title {
          position:relative;
        }
    `
    
    function handleEventClick(eventInfo){
      let title = eventInfo.event._def.title;
      let description = eventInfo.event._def.extendedProps.description;
      let start = eventInfo.event._instance.range.start;
      let startDate = start.getFullYear() + '-' + String(start.getMonth() + 1).padStart(2, '0') + '-' + String(start.getDate()).padStart(2, '0');
      let startDateEng = String(start.getDate()).padStart(2, '0') + ' ' + monthList[start.getMonth()] + ' ' + start.getFullYear();
      let startTime = start.toUTCString().split(' '); startTime = startTime[startTime.length-2]; startTime = (startTime === '00:00:00') ? '' : startTime;
      let end = eventInfo.event._instance.range.end;
      let endDate = end.getFullYear() + '-' + String(end.getMonth() + 1).padStart(2, '0') + '-' + String(end.getDate()).padStart(2, '0');
      let endDateEng = String(end.getDate()).padStart(2, '0') + ' ' + monthList[end.getMonth()] + ' ' + end.getFullYear();
      let endTime = end.toUTCString().split(' '); endTime = endTime[endTime.length-2]; endTime = (endTime === '00:00:00') ? '' : endTime;
      let className = eventInfo.event._def.ui.classNames[0].slice(3);
      let eventId = eventInfo.event._def.publicId;

      const currentEvent = {...selectedEvent, 
        id:eventId,
        title:title, 
        description:description, 
        className:className, 
        startTime: startTime,
        startDate: startDate,
        startDateEng: startDateEng,
        endTime: endTime,
        endDate: endDate,
        endDateEng: endDateEng,
      }
      setSelectedEvent(currentEvent);
      setPreviewModal(true)
    }

    function handleDeleteEvent(){
      const updatedEvents = events.filter((item) => item.id !== selectedEvent.id)
      setEvents(updatedEvents);
      setDeleteModal(false);
      setSelectedEvent(selectEvent)
    }

    function handleFormSubmit(event){
        event.preventDefault();
        let newTitle = modalForm.current.querySelector('#eventTitle').value; 
        let neWStartDate = modalForm.current.querySelector('#eventStartDate').value; 
        let newStartTime = modalForm.current.querySelector('#eventStartTime').value; 
        let neWEndDate = modalForm.current.querySelector('#eventEndDate').value; 
        let newEndTime = modalForm.current.querySelector('#eventEndTime').value; 
        let newDescription = modalForm.current.querySelector('#eventDescription').value; 
        let neWclassName = modalForm.current.querySelector('#eventCategory').value; 
        let newEvent= {
            id: selectedEvent.id || 'added-event-id-' + Math.floor(Math.random()*9999999),
            title: newTitle,
            start: neWStartDate + (newStartTime ? 'T' + newStartTime + 'Z' : ''),
            end: neWEndDate + (newEndTime ? 'T' + newEndTime + 'Z' : ''),
            className: `fc-${neWclassName}`,
            description: newDescription
        }
        setEvents([...events,newEvent]);
    }

    function handleEditEvent(e){
        const updatedEvents = events.filter((item) => item.id !== selectedEvent.id)
        setEvents(updatedEvents);
        closeFormModal();
    }

    function handleAddEvent(e){
        closeFormModal();
    }

    return (
        <>
        <Layout title="Calendar App" content="container">
            <BlockHead>
                <BlockHeadBetween>
                <Block.HeadContent>
                        <Block.Title tag="h2">Room Availability</Block.Title>
                        <nav>
                            <ol className="breadcrumb breadcrumb-arrow mb-0">
                                <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/hotel-manage/rooms-list">Rooms</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Room Availability</li>
                            </ol>
                        </nav>
                    </Block.HeadContent>
                    <BlockHeadContent tools>
                        <ul className="d-flex gap g-3 justify-content-center">
                            <li>
                                <Link to="/hotel-manage/rooms-list">
                                    <Button variant="primary">
                                        <Icon name="arrow-left"></Icon><span>Back</span>
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </BlockHeadContent>
                </BlockHeadBetween>
            </BlockHead>
            <Block>
                <Card>
                    <Card.Body>
                        <style>{globalFcStyle}</style>
                        <FullCalendar
                            events= {events}
                            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin, listPlugin ]}
                            initialView="dayGridMonth"
                            timeZone= 'UTC'
                            themeSystem= 'bootstrap'
                            headerToolbar= {{
                                left: 'title prev,next',
                                center: null,
                                right: 'today dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                            }}
                            height= {800}
                            contentHeight= {780}
                            aspectRatio= {3}
                            editable= {true}
                            droppable= {true}
                            views= {{
                                dayGridMonth: {
                                    dayMaxEventRows: 2,
                                }
                            }}
                            eventContent={renderEventContent}
                            eventClick={handleEventClick}
                        />
                    </Card.Body>
                </Card>
            </Block>
        </Layout>
        <Modal show={previewModal} onHide={closePreviewModal}>
            <Modal.Header closeButton>
              <Modal.Title className="event-title" as="h4">Date Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <Row className="g-3">
                    <Col xs="6">
                        <h6 className="overline-title">Start Time</h6>
                        <p className="event-start small">{selectedEvent.startDateEng} {(selectedEvent.startTime && ` - ${toTwelve(selectedEvent.startTime)}`)}</p>
                    </Col>
                    <Col xs="6">
                        <h6 className="overline-title">End Time</h6>
                        <p className="event-end small">{selectedEvent.endDateEng} {(selectedEvent.endTime && ` - ${toTwelve(selectedEvent.endTime)}`)}</p>
                    </Col>
                    <Col xs="6">
                        <h6 className="overline-title">Status</h6>
                        <p className="event-description small">Available</p>
                    </Col>
                    <Col xs="6">
                        <h6 className="overline-title">Price</h6>
                        <p className="event-description small"> ₹ 2000</p>
                    </Col>
                    <Col xs="6">
                        <h6 className="overline-title">Number of room</h6>
                        <p className="event-description small"> 5</p>
                    </Col>
                </Row>
              </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger"  onClick={closePreviewModal}>Close</Button>
                <Button variant="primary" onClick={openEditModal}>Edit</Button>
            </Modal.Footer>
        </Modal>

        <Modal show={deleteModal} onHide={closeDeleteModal}>
              <div className="modal-content">
                  <div className="modal-body p-5 text-center">
                      <div className="media media-rounded media-xxl media-middle mx-auto text-bg-danger mb-4"><em className="icon ni ni-cross"></em></div>
                      <h3>Are You Sure ?</h3>
                      <p className="small">This event data will be removed permanently.</p>
                      <ul className="d-flex gap g-3 justify-content-center pt-1">
                          <li><Button variant="success" onClick={handleDeleteEvent}>Yes Delete it!</Button></li>
                          <li><Button variant="danger" className="btn-soft" onClick={closeDeleteModal}>Cancel</Button></li>
                      </ul>
                  </div>
                  <button type="button" className="btn-close position-absolute top-0 end-0 p-3" onClick={closeDeleteModal} aria-label="Close"></button>
              </div>
        </Modal>

        <Modal show={formModal.opened} onHide={closeFormModal} size="lg">
            <Form ref={modalForm} onSubmit={handleFormSubmit}>
                <Modal.Header closeButton>
                <Modal.Title className="event-title" as="h4">Date Information Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="g-gs">
                       
                        <Col sm="6">
                            <Form.Group>
                                <Form.Label htmlFor="eventStartDate" >Starts</Form.Label>
                                <Row className="g-2">
                                    <Col xs="7">
                                        <div className="form-control-wrap">
                                            <DatePicker id="eventStartDate" value={formModal.eventStartDate} placeholder="yyyy-mm-dd"/>
                                        </div>
                                    </Col>
                                    <Col xs="5">
                                        <div className="form-control-wrap">
                                            <TimePicker id="eventStartTime" value={formModal.eventStartTime} placeholder="hh:mm"/>
                                        </div>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col sm="6">
                            <Form.Group>
                                <Form.Label htmlFor="eventEndDate">Ends</Form.Label>
                                <Row className="g-2">
                                    <Col xs="7">
                                        <div className="form-control-wrap">
                                            <DatePicker id="eventEndDate" value={formModal.eventEndDate} placeholder="yyyy-mm-dd"/>
                                        </div>
                                    </Col>
                                    <Col xs="5">
                                        <div className="form-control-wrap">
                                            <TimePicker id="eventEndTime" value={formModal.eventEndTime} placeholder="hh:mm"/>
                                        </div>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        
                        <Col xs="12">
                            <Form.Group className="fc-category-select">
                                <Form.Label htmlFor="eventCategory">Status</Form.Label>
                                <div className="form-control-wrap">
                                    <EventCategory id="eventCategory" value={formModal.eventCategory} placeholder="Select Category"/>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col xs="6">
                            <Form.Group className="fc-category-select">
                                <Form.Label htmlFor="eventCategory">Price</Form.Label>
                                <div className="form-control-wrap">
                                    <Form.Control type="number"  defaultValue="" placeholder="Enter Price" />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col xs="6">
                            <Form.Group className="fc-category-select">
                                <Form.Label htmlFor="eventCategory">Number of room</Form.Label>
                                <div className="form-control-wrap">
                                    <Form.Control type="number"  defaultValue="" placeholder="Enter Number of room" />
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={closeFormModal}>Discard</Button>
                    {formModal.action === 'add' && <Button variant="primary" type="submit" onClick={handleAddEvent}>Add Event</Button>}
                    {formModal.action === 'edit' && <Button variant="primary" type="submit" onClick={handleEditEvent}>Update</Button>}
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}

export default RoomAvailability