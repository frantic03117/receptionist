// import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaHeartbeat, FaUserMd, FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";

const SpecializationCard = ({ data }) => {
    return (
        <Card className="max-w-sm rounded-2xl shadow-lg bg-white p-5 transition-transform hover:scale-105">
            {/* Image Section */}
            <div className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden">
                <img
                    src={data.image.file}
                    alt={data.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <CardHeader className="mt-4 text-center">
                <CardTitle className="text-2xl font-bold text-gray-800">{data.name}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Priority Badge */}
                <Badge className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md">
                    Priority: {data.priority}
                </Badge>

                {/* Doctor Count */}
                <div className="flex items-center gap-2 text-gray-600">
                    <FaUserMd className="text-lg text-blue-500" />
                    <span className="font-medium">{data.doctor_count} Doctors</span>
                </div>

                {/* Search Tags */}
                <div className="flex items-start gap-2 text-gray-600">
                    <FaSearch className="text-lg text-blue-500" />
                    <p className="text-sm">{data.search_tags}</p>
                </div>

                {/* Created Date */}
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <FaHeartbeat className="text-red-500" />
                    <span>Added on {new Date(data.created_at).toLocaleDateString()}</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default SpecializationCard;

SpecializationCard.propTypes = {
    data : PropTypes.object
}
