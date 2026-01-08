import React, {useEffect, useState} from "react";
import {Button, Card, Col, FormLabel, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Loader from "../../../global/loader";
import {PAGE_LIMIT} from "../../../utils/constants";
import Pagination from "../../../global/pagination";
import ThreeDots from "../../../_admin/assets/media/svg/threeDots.svg";
import {CustomSelectTable} from "../../custom/select/CustomSelectTable";
import APICallService from "../../../api/apiCallService";
import {PPA, PLANT} from "../../../api/apiEndPoints";
import {PPAAPIJSON} from "../../../api/apiJSON/ppa";
import {useDebounce} from "../../../utils/useDebounce";
import {IListPpa} from "../../../types";
import AddIcon from "../../../_admin/assets/media/svg/add.svg";
import { CustomSelectWhite } from "../../custom/select/CustomSelectWhite";
import { PLANTAPIJSON } from "../../../api/apiJSON/plant";
import Method from "../../../utils/methods";
 
const Ppa = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [ppas, setPpas] = useState<IListPpa[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [showModel, setShowModel] = useState<boolean>(false);
    const [ppaId, setPpaId] = useState<string | null>(null);
    const [plantId, setPlantId] = useState<string | undefined>(undefined);
    const [pageLimit, setPageLimit] = useState(PAGE_LIMIT);
    const [searchTerm, setSearchTerm] = useState('');
    const [plantOptions, setPlantOptions] = useState<any[]>([]);

    useEffect(() => {
        const fetchPlants = async () => {
            fetchPlantsData(page, pageLimit, searchTerm)
        };
        fetchPlants();
    }, [])

    const fetchPlantsData = async (pageNo: number, limit: number, searchTerm: string = '') => {
        setLoading(true);
        const params = {
            page: pageNo,
            limit: limit,
            sortKey: '_createdAt',
            sortOrder: -1,
            needCount: true,
            searchTerm: searchTerm ? searchTerm : undefined,
        }
        const apiService = new APICallService(PLANT.LISTPLANT, PLANTAPIJSON.listPlant(params));
        const response = await apiService.callAPI();
        if (response && response.records) {
            const options = response.records.map((plant: any) => ({
                value: plant._id,
                label: `${plant?.propertyAddress?.address}`
            }));
            setPlantOptions(options);
        }
    }

    useEffect(() => {
        fetchPpa(page, pageLimit);
    }, []);

    const fetchPpa = async (
        pageNo: number,
        limit: number,
        searchTerm? : string,
        ppaId? : string
    ) => {
        setLoading(true);
        let params = {
            page: pageNo,
            limit: limit,
            sortKey: '_createdAt',
            sortOrder: -1,
            needCount: true,
            searchTerm: searchTerm ? searchTerm : undefined,
        }

        let apiService = new APICallService(
            PPA.LISTPPA,
            PPAAPIJSON.listPpa(params)
        );

        let response = await apiService.callAPI();
        console.log("sdfghjkdfghuj",response);
        if (response) {
            setTotalRecords(response.total);
            setPpas(response.records);
        }
        setLoading(false);
    }

    const handleSelectChange = (
        eventKey: string | number | undefined | null
        ) => {
        const newPlantId = eventKey ? eventKey.toString() : undefined;
        setPlantId(newPlantId);
        setPage(1);
        fetchPpa(1, pageLimit, searchTerm, newPlantId);
    };


    const debouncedSearch = useDebounce(fetchPpa, 400);

    const handleSearch = async (value: string) => {
        // value = value.trimStart();
        // const regex = /^(\S+( \S+)*)? ?$/;
        // const isValid = regex.test(value);
        // if (!isValid) {
        //     return;
        // }
        setSearchTerm(value.trimStart());
        setPage(1);
        setLoading(true);
        setTotalRecords(0);
        await fetchPpa(1, pageLimit, value);
    };

    const handleCurrentPage = async (val: number) => {
        if (val === page || val.toString() === '...') return;
        setPage(val);
        await fetchPpa(
            val,
            pageLimit,
            searchTerm,
        );
    };

    const handleNextPage = async (val: number) => {
        setPage(val + 1);
        await fetchPpa(
            val + 1,
            pageLimit,
            searchTerm,
        );
    };

    const handlePreviousPage = async (val: number) => {
        setPage(val - 1);
        await fetchPpa(
            val - 1,
            pageLimit,
            searchTerm,
        );
    };

    const handlePageLimit = async (event: any) => {
        setPage(1);
        setPageLimit(+event.target.value);
        await fetchPpa(
            1,
            +event.target.value,
            searchTerm,
        );
    }

    const handlePpaOption = async (
        event: any,
        index: number,
        ppa: any
    ) => {
        switch (event.value) {
            case 1:
                navigate('/ppa/all-ppa/view-details', { state: ppa });
                break;

            case 3:
                setShowModel(true);
                setPpaId(ppa._id);
                break;

            default:
                break;
        }
    };

    // Format expiryDate to dd-mm-yyyy
    const formatDate = (dateString: string): string => {
        return Method.convertDateToFormat(dateString, 'DD-MM-YYYY');
    };

    return (
        <div className="p-9 bg-light">
            <Row className="align-items-center">
                <Col
                    xs={12}
                    className="mb-4"
                >
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center">
                        <h1 className="fs-22 mt-2 fw-bolder">Plants</h1>
                        <div className="badge badge-primary ms-3 rounded-pill">
                            <span className="p-1 fs-14 text-white">{totalRecords}</span>
                        </div>
                    </div>
                    <Button
                        variant="primary"
                        className="fs-16 fw-bold btn-lg"
                        onClick={() => navigate('/plant/all-plants/add-plant')}
                    >
                        <img
                            src={AddIcon}
                            alt="Add"
                            className="me-2"
                            width={18}
                            height={18}
                        />
                        <span className="fs-14 fw-700">Add PPA</span>
                    </Button>
                </div>
                </Col>
                
                <Col
                    xs={12}
                    className="mb-4"
                >
                    <Row className="align-items-end g-5">
                        {/* <Col>
                            <div className="position-relative flex-grow-1 d-flex align-items-center w-sm-300px w-md-375px w-lg-300px">
                                <KTSVG
                                    path="/media/icons/duotune/general/gen021.svg"
                                    className="svg-icon-3 position-absolute ms-3"
                                />
                                <input
                                    type="text"
                                    id="kt_filter_search"
                                    className="form-control form-control-white min-h-60px form-control-lg ps-10"
                                    placeholder="Search by "
                                    value={searchTerm}
                                    onChange={(event) => handleSearch(event.target.value)}
                                />
                            </div>
                        </Col> */}
                        
                        <Col sm={4} xl={3}>
                            <FormLabel className="fs-16 fw-500 text-dark">Plant</FormLabel>
                            <CustomSelectWhite
                                placeholder="Select Plant"
                                options={[...plantOptions]}
                                isMulti={false}
                                onChange={(selected: any) => {
                                    handleSelectChange(selected ? selected.value : undefined);
                                }}
                                value={
                                    plantId
                                    ? plantOptions.find((option) => option.value === plantId) || null
                                    : null
                                }
                                minHeight="60px"
                                controlFontSize="14px"
                                fontWeight="500"
                            />
                        </Col>
                    </Row>
                </Col>
                
                <Col>
                <Card className="border border-r10px">
                    <Card.Body className="p-0">
                        <div className="table-responsive">
                            <table className="table table-rounded table-row-bordered align-middle gs-7 gy-4">
                                <thead>
                                    <tr className="fw-bold fs-14 fw-600 text-dark border-bottom h-70px align-middle">
                                    <th className="min-w-160px text-center">Property Address</th>
                                    <th className="min-w-160px text-center">Property Type</th>
                                    <th className="min-w-150px text-center">Plant Capacity</th>
                                    <th className="min-w-160px text-center">Tarrif</th>
                                    <th className="min-w-160px text-center">Start Date</th>
                                    <th className="min-w-160px text-center">End Date </th>
                                    <th className="min-w-150px text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                    <tr>
                                        <td colSpan={4}>
                                        <div className="w-100 d-flex justify-content-center text-center">
                                            <Loader loading={loading} />
                                        </div>
                                        </td>
                                    </tr>
                                    ) : (
                                    <>
                                        {ppas.length === 0 && !loading ? (
                                            <tr>
                                                <td colSpan={4}>
                                                <div className="w-100 d-flex justify-content-center text-center">
                                                    <div className="fw-bold fs-18">
                                                        No PPAs Found!
                                                    </div>
                                                </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            <>
                                                {ppas.map((ppa, index) => (
                                                    <tr
                                                        key={index}
                                                        className=""
                                                    >
                                                        <td
                                                            className="fs-15 fw-500 text-center"
                                                            onClick={() =>
                                                                navigate(
                                                                    '/ppa/view-details',
                                                                    {
                                                                        state: ppa,
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            {ppa?.plantDetail?.address}
                                                        </td>
                                                        <td className="fs-14 fw-500 text-center">
                                                            {ppa?.plantDetail?.propertyType}
                                                        </td>
                                                        <td className="fs-14 fw-500 text-center">
                                                            {ppa?.plantCapacity}
                                                        </td>
                                                        <td className="fs-14 fw-500 text-center">
                                                            {ppa?.tarrif}
                                                        </td>
                                                        <td className="fs-14 fw-500 text-center">
                                                            {formatDate(ppa?.startDate)}
                                                        </td> 
                                                        <td className="fs-14 fw-500 text-center">
                                                            {formatDate(ppa?.endDate)}
                                                        </td>
                                                        <td className="text-center">
                                                            <CustomSelectTable
                                                                backgroundColor="white"
                                                                marginLeft={'0px'}
                                                                width={'auto'}
                                                                placeholder={
                                                                <img
                                                                    src={ThreeDots}
                                                                    width={32}
                                                                    height={32}
                                                                    alt=""
                                                                />
                                                                }
                                                                onChange={(event: any) => {
                                                                    handlePpaOption(
                                                                        event,
                                                                        index,
                                                                        ppa
                                                                    );
                                                                }}
                                                                options={[
                                                                    {
                                                                        label: (
                                                                        <button className="btn btn-link fs-14 fw-500 text-black w-100 d-flex justify-content-center align-items-center py-3">
                                                                            View details
                                                                        </button>
                                                                        ),
                                                                        value: 1,
                                                                    },

                                                                    {
                                                                        label: (
                                                                        <button className="btn btn-link fs-14 fw-500 text-danger w-100 d-flex justify-content-center align-items-center py-3">
                                                                            Delete
                                                                        </button>
                                                                        ),
                                                                        value: 3,
                                                                    },
                                                                ]}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </>
                                        )}
                                    </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card.Body>
                </Card>
                </Col>
                {totalRecords > 0 && !loading ? (
                    <Pagination
                        totalRecords={totalRecords}
                        currentPage={page}
                        handleCurrentPage={handleCurrentPage}
                        handleNextPage={handleNextPage}
                        handlePreviousPage={handlePreviousPage}
                        handlePageLimit={handlePageLimit}
                        pageLimit={pageLimit}
                    />
                    ) : (
                    <></>
                )}
            </Row>
        </div>
    );
}

export default Ppa;