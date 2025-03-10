import React, { useState, useEffect }  from "react";
import BADGES from "../../data/badges";
import DEMO_DATA from "../../data/demo_data";
import userIcon from "../assets/user-icon-2.jpg";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const navigate = useNavigate();
    const [herbList, setHerbList] = useState([]);
    useEffect(() => {
        const storedHerbs = JSON.parse(localStorage.getItem("collections")) || [];

        const fetchedHerbs = storedHerbs.map(herbId => {
            const foundHerb = DEMO_DATA.find(herb => herb.id === herbId);
            if (foundHerb) {
                return {
                    id: herbId,
                    name: foundHerb["scientificName.x"] || "Unknown Herb",
                    mediaUrl: foundHerb["identifier"] || "default.png"
                };
            }
            return null;
        }).filter(herb => herb !== null);

        setHerbList(fetchedHerbs);
    }, []);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    {/* User Profile Section */}
                    <div className="mb-4">
                        <div className="text-center">
                            <img 
                                src={userIcon} 
                                alt="User Profile" 
                                className="rounded-circle mb-3"
                                width="150"
                                height="150"
                            />
                            <h2 className="fw-bold">John Doe</h2>
                        </div>
                    </div>

                    {/* Badges Achieved Section with Alert */}
                    <div className="alert alert-warning text-center shadow-lg">
                        <h4 className="fw-bold pt-4">🏆 Badges Achieved</h4>
                        <p className="mb-3">Congratulations! You've earned these badges.</p>
                        <div className="d-flex flex-wrap justify-content-center">
                            {BADGES.length > 0 ? (
                                BADGES.map((badge) => (
                                    <div key={badge.id} className="text-center m-3">
                                        <i className={`bi ${badge.icon} text-warning`} style={{ fontSize: "2rem" }}></i>
                                        <p className="fw-bold mt-1">{badge.name}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted text-center">No badges earned yet.</p>
                            )}
                        </div>
                    </div>
                    {/* Herbs Collected Section */}
                    <div className="alert alert-success text-center shadow-lg">
                        <h4 className="fw-bold">🌿 Herbs Collected</h4>
                        <p className="mb-3">Congratulations! You've collected these herbs.</p>
                        <div className="d-flex flex-wrap justify-content-center">
                            {herbList.length > 0 ? (
                                herbList.map(herb => (
                                    <button 
                                        key={herb.id} 
                                        className="herb-button text-center m-3" 
                                        onClick={() => navigate(`/herb/${herb.id}`)}
                                    >
                                        <img 
                                            src={herb.mediaUrl} 
                                            alt={herb.name} 
                                            className="herb-image rounded-circle" 
                                        />
                                        <p className="herb-name">{herb.name}</p>
                                    </button> 
                                ))
                            ) : (
                                <p className="text-muted">No herbs collected yet.</p>
                            )}
                        </div>
                    </div>
                    <style>
                        {`
                        .herb-button {
                            background: transparent;
                            border: none;
                            outline: none;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            position: relative;
                        }

                        .herb-image {
                            width: 60px;
                            height: 60px;
                            object-fit: cover;
                            border: 2px solid #28a745;
                        }

                        .herb-name {
                            font-weight: bold;
                            margin-top: 5px;
                            opacity: 0;
                            transition: opacity 0.3s ease-in-out;
                            position: absolute;
                            bottom: -20px;
                            background: rgba(0, 0, 0, 0.75);
                            color: white;
                            padding: 3px 6px;
                            border-radius: 4px;
                            white-space: nowrap;
                            font-size: 0.9rem;
                        }

                        .herb-button:hover .herb-name {
                            opacity: 1;
                        }
                        `}
                    </style>
                
                </div>
            </div>
        </div>
    );
}