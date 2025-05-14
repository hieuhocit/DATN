import mongoose from "mongoose";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Payment from "../models/Payment.js";
import PaymentItem from "../models/PaymentItem.js";
import User from "../models/User.js";
import {
  calculatePercentChange,
  getDateRanges,
  getMonthName,
} from "../utils/helpers/stas.js";

const StatisticsService = {
  getDashboardStats: async function () {
    const {
      currentWeekStart,
      previousWeekStart,
      previousWeekEnd,
      currentYear,
    } = getDateRanges();

    // User statistics
    const userStats = await this.getUserStatistics(
      currentWeekStart,
      previousWeekStart,
      previousWeekEnd,
      currentYear
    );

    // Course statistics
    const courseStats = await this.getCourseStatistics(
      currentWeekStart,
      previousWeekStart,
      previousWeekEnd,
      currentYear
    );

    // Instructor statistics
    const instructorStats = await this.getInstructorStatistics(
      currentWeekStart,
      previousWeekStart,
      previousWeekEnd,
      currentYear
    );

    // Revenue statistics
    const revenueStats = await this.getRevenueStatistics(
      currentWeekStart,
      previousWeekStart,
      previousWeekEnd,
      currentYear
    );

    return {
      user: userStats,
      course: courseStats,
      instructor: instructorStats,
      revenue: revenueStats,
    };
  },
  getUserStatistics: async function (
    currentWeekStart: Date,
    previousWeekStart: Date,
    previousWeekEnd: Date,
    currentYear: number
  ) {
    // Count total users
    const totalUsers = await User.countDocuments({
      role: { $ne: "admin" }, // Exclude admin users
    });

    // Count users created in current week
    const currentWeekUsers = await User.countDocuments({
      role: { $ne: "admin" }, // Exclude admin users
      createdAt: { $gte: currentWeekStart },
    });

    // Count users created in previous week
    const previousWeekUsers = await User.countDocuments({
      role: { $ne: "admin" }, // Exclude admin users
      createdAt: { $gte: previousWeekStart, $lte: previousWeekEnd },
    });

    // Calculate percentage change
    const percentChange = calculatePercentChange(
      currentWeekUsers,
      previousWeekUsers
    );

    // Get monthly data for the chart
    const monthlyData = await User.aggregate([
      {
        $match: {
          role: { $ne: "admin" }, // Exclude admin users
          createdAt: {
            $gte: new Date(currentYear, 0, 1),
            $lte: new Date(currentYear, 11, 31, 23, 59, 59, 999),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Format chart data
    const chartData = Array.from({ length: 12 }, (_, i) => {
      const monthData = monthlyData.find((item) => item._id === i + 1);
      return {
        month: getMonthName(i),
        value: monthData ? monthData.count : 0,
      };
    });

    return {
      total: totalUsers,
      percent: percentChange,
      chartData,
    };
  },
  getCourseStatistics: async function (
    currentWeekStart: Date,
    previousWeekStart: Date,
    previousWeekEnd: Date,
    currentYear: number
  ) {
    // Count total courses
    const totalCourses = await Course.countDocuments();

    // Count courses created in current week
    const currentWeekCourses = await Course.countDocuments({
      createdAt: { $gte: currentWeekStart },
    });

    // Count courses created in previous week
    const previousWeekCourses = await Course.countDocuments({
      createdAt: { $gte: previousWeekStart, $lte: previousWeekEnd },
    });

    // Calculate percentage change
    const percentChange = calculatePercentChange(
      currentWeekCourses,
      previousWeekCourses
    );

    // Get monthly data for the chart
    const monthlyData = await Course.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(currentYear, 0, 1),
            $lte: new Date(currentYear, 11, 31, 23, 59, 59, 999),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Format chart data
    const chartData = Array.from({ length: 12 }, (_, i) => {
      const monthData = monthlyData.find((item) => item._id === i + 1);
      return {
        month: getMonthName(i),
        value: monthData ? monthData.count : 0,
      };
    });

    return {
      total: totalCourses,
      percent: percentChange,
      chartData,
    };
  },
  getInstructorStatistics: async function (
    currentWeekStart: Date,
    previousWeekStart: Date,
    previousWeekEnd: Date,
    currentYear: number
  ) {
    // Count total instructors
    const totalInstructors = await User.countDocuments({ role: "instructor" });

    // Count instructors created in current week
    const currentWeekInstructors = await User.countDocuments({
      role: "instructor",
      createdAt: { $gte: currentWeekStart },
    });

    // Count instructors created in previous week
    const previousWeekInstructors = await User.countDocuments({
      role: "instructor",
      createdAt: { $gte: previousWeekStart, $lte: previousWeekEnd },
    });

    // Calculate percentage change
    const percentChange = calculatePercentChange(
      currentWeekInstructors,
      previousWeekInstructors
    );

    // Get monthly data for the chart
    const monthlyData = await User.aggregate([
      {
        $match: {
          role: "instructor",
          createdAt: {
            $gte: new Date(currentYear, 0, 1),
            $lte: new Date(currentYear, 11, 31, 23, 59, 59, 999),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Format chart data
    const chartData = Array.from({ length: 12 }, (_, i) => {
      const monthData = monthlyData.find((item) => item._id === i + 1);
      return {
        month: getMonthName(i),
        value: monthData ? monthData.count : 0,
      };
    });

    return {
      total: totalInstructors,
      percent: percentChange,
      chartData,
    };
  },
  getRevenueStatistics: async function (
    currentWeekStart: Date,
    previousWeekStart: Date,
    previousWeekEnd: Date,
    currentYear: number
  ) {
    // Calculate total platform revenue (10% of each course sale)
    const revenueAggregation = await PaymentItem.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$price" },
          platformRevenue: { $sum: { $multiply: ["$price", 0.1] } }, // 10% fee
        },
      },
    ]);

    const totalRevenue =
      revenueAggregation.length > 0
        ? Math.round(revenueAggregation[0].platformRevenue)
        : 0;
    const totalSales =
      revenueAggregation.length > 0 ? revenueAggregation[0].totalSales : 0;

    // Calculate current week revenue
    const currentWeekRevenue = await PaymentItem.aggregate([
      {
        $match: {
          createdAt: { $gte: currentWeekStart },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$price" },
          platformRevenue: { $sum: { $multiply: ["$price", 0.1] } }, // 10% fee
        },
      },
    ]);

    const currentWeekTotal =
      currentWeekRevenue.length > 0
        ? Math.round(currentWeekRevenue[0].platformRevenue)
        : 0;

    // Calculate previous week revenue
    const previousWeekRevenue = await PaymentItem.aggregate([
      {
        $match: {
          createdAt: {
            $gte: previousWeekStart,
            $lte: previousWeekEnd,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$price" },
          platformRevenue: { $sum: { $multiply: ["$price", 0.1] } }, // 10% fee
        },
      },
    ]);

    const previousWeekTotal =
      previousWeekRevenue.length > 0
        ? Math.round(previousWeekRevenue[0].platformRevenue)
        : 0;

    // Calculate percentage change
    const percentChange = calculatePercentChange(
      currentWeekTotal,
      previousWeekTotal
    );

    // Get monthly data for the chart
    const monthlyData = await PaymentItem.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(currentYear, 0, 1),
            $lte: new Date(currentYear, 11, 31, 23, 59, 59, 999),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalSales: { $sum: "$price" },
          platformRevenue: { $sum: { $multiply: ["$price", 0.1] } }, // 10% fee
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Format chart data
    const chartData = Array.from({ length: 12 }, (_, i) => {
      const monthData = monthlyData.find((item) => item._id === i + 1);
      return {
        month: getMonthName(i),
        value: monthData ? Math.round(monthData.platformRevenue) : 0,
        // You might want to include total sales for reference
        totalSales: monthData ? monthData.totalSales : 0,
      };
    });

    return {
      total: totalRevenue,
      percent: percentChange,
      chartData,
      additionalData: {
        totalSales: totalSales, // Include total sales for reference
        platformFeePercentage: 10, // Document the fee percentage used
      },
    };
  },

  getDashboardStatsForInstructor: async function (instructorId: string) {
    const {
      currentWeekStart,
      previousWeekStart,
      previousWeekEnd,
      currentYear,
    } = getDateRanges();

    // User statistics
    const userStats = await this.getUserStatisticsForInstructor(
      currentWeekStart,
      previousWeekStart,
      previousWeekEnd,
      currentYear,
      instructorId
    );

    // Course statistics
    const courseStats = await this.getCourseStatisticsForInstructor(
      currentWeekStart,
      previousWeekStart,
      previousWeekEnd,
      currentYear,
      instructorId
    );

    // Revenue statistics
    const revenueStats = await this.getRevenueStatisticsForInstructor(
      currentWeekStart,
      previousWeekStart,
      previousWeekEnd,
      currentYear,
      instructorId
    );

    return {
      user: userStats,
      course: courseStats,
      revenue: revenueStats,
    };
  },
  getCourseStatisticsForInstructor: async function (
    currentWeekStart: Date,
    previousWeekStart: Date,
    previousWeekEnd: Date,
    currentYear: number,
    instructorId: string
  ) {
    // Count total courses
    const totalCourses = await Course.countDocuments({
      instructorId: instructorId,
    });

    // Count courses created in current week
    const currentWeekCourses = await Course.countDocuments({
      instructorId: instructorId,
      createdAt: { $gte: currentWeekStart },
    });
    // Count courses created in previous week
    const previousWeekCourses = await Course.countDocuments({
      instructorId: instructorId,
      createdAt: { $gte: previousWeekStart, $lte: previousWeekEnd },
    });

    // Calculate percentage change
    const percentChange = calculatePercentChange(
      currentWeekCourses,
      previousWeekCourses
    );

    // Get monthly data for the chart
    const monthlyData = await Course.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(currentYear, 0, 1),
            $lte: new Date(currentYear, 11, 31, 23, 59, 59, 999),
          },
          instructorId: new mongoose.Types.ObjectId(instructorId),
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Format chart data
    const chartData = Array.from({ length: 12 }, (_, i) => {
      const monthData = monthlyData.find((item) => item._id === i + 1);
      return {
        month: getMonthName(i),
        value: monthData ? monthData.count : 0,
      };
    });

    return {
      total: totalCourses,
      percent: percentChange,
      chartData,
    };
  },
  getUserStatisticsForInstructor: async function (
    currentWeekStart: Date,
    previousWeekStart: Date,
    previousWeekEnd: Date,
    currentYear: number,
    instructorId: string
  ) {
    // Count total unique users enrolled in instructor's courses
    const resUser = await Enrollment.aggregate([
      // 1. Lookup Course to get instructorId
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      // 2. Unwind course array to object
      { $unwind: "$course" },
      // 3. Filter enrollments by instructorId
      {
        $match: {
          "course.instructorId": new mongoose.Types.ObjectId(instructorId),
        },
      },
      // 4. Group by userId to count unique users
      {
        $group: {
          _id: "$userId", // Group by userId to get unique users
        },
      },
      // 5. Count the number of unique users
      {
        $group: {
          _id: null,
          uniqueUsers: { $sum: 1 },
        },
      },
    ]);

    const totalUsers = resUser.length > 0 ? resUser[0].uniqueUsers : 0;

    // Count unique users who enrolled in current week
    const resUserCurrentWeek = await Enrollment.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: "$course" },
      {
        $match: {
          "course.instructorId": new mongoose.Types.ObjectId(instructorId),
          createdAt: { $gte: currentWeekStart },
        },
      },
      // Group by userId first to count unique users
      {
        $group: {
          _id: "$userId",
        },
      },
      // Count the number of unique users
      {
        $group: {
          _id: null,
          uniqueUsers: { $sum: 1 },
        },
      },
    ]);

    const currentWeekUsers =
      resUserCurrentWeek.length > 0 ? resUserCurrentWeek[0].uniqueUsers : 0;

    // Count unique users who enrolled in previous week
    const resUserPrevWeek = await Enrollment.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: "$course" },
      {
        $match: {
          "course.instructorId": new mongoose.Types.ObjectId(instructorId),
          createdAt: { $gte: previousWeekStart, $lte: previousWeekEnd },
        },
      },
      // Group by userId first to count unique users
      {
        $group: {
          _id: "$userId",
        },
      },
      // Count the number of unique users
      {
        $group: {
          _id: null,
          uniqueUsers: { $sum: 1 },
        },
      },
    ]);

    const previousWeekUsers =
      resUserPrevWeek.length > 0 ? resUserPrevWeek[0].uniqueUsers : 0;

    // Calculate percentage change
    const percentChange = calculatePercentChange(
      currentWeekUsers,
      previousWeekUsers
    );

    // Get monthly data for unique users per month
    const monthlyData = await Enrollment.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: "$course" },
      {
        $match: {
          "course.instructorId": new mongoose.Types.ObjectId(instructorId),
          createdAt: {
            $gte: new Date(currentYear, 0, 1),
            $lte: new Date(currentYear, 11, 31, 23, 59, 59, 999),
          },
        },
      },
      // Add a field for month extraction
      {
        $addFields: {
          month: { $month: "$createdAt" },
        },
      },
      // Group by userId AND month to count unique users per month
      {
        $group: {
          _id: {
            userId: "$userId",
            month: "$month",
          },
        },
      },
      // Now group by just month to get counts
      {
        $group: {
          _id: "$_id.month",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Format chart data
    const chartData = Array.from({ length: 12 }, (_, i) => {
      const monthData = monthlyData.find((item) => item._id === i + 1);
      return {
        month: getMonthName(i),
        value: monthData ? monthData.count : 0,
      };
    });

    return {
      total: totalUsers,
      percent: percentChange,
      chartData,
    };
  },
  getRevenueStatisticsForInstructor: async function (
    currentWeekStart: Date,
    previousWeekStart: Date,
    previousWeekEnd: Date,
    currentYear: number,
    instructorId: string
  ) {
    // Calculate total platform revenue (10% of each course sale)
    const revenueAggregation = await PaymentItem.aggregate([
      // 1. Join vào Course để lấy instructorId
      {
        $lookup: {
          from: "courses", // collection name
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      // 2. Unwind mảng course thành object
      { $unwind: "$course" },
      // 3. Lọc chỉ những enrollment có course.instructorId thỏa mãn
      {
        $match: {
          "course.instructorId": new mongoose.Types.ObjectId(instructorId),
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$price" },
          platformRevenue: { $sum: { $multiply: ["$price", 0.9] } }, // exclude 10% fee
        },
      },
    ]);

    const totalRevenue =
      revenueAggregation.length > 0
        ? Math.round(revenueAggregation[0].platformRevenue)
        : 0;
    const totalSales =
      revenueAggregation.length > 0 ? revenueAggregation[0].totalSales : 0;

    // Calculate current week revenue
    const currentWeekRevenue = await PaymentItem.aggregate([
      // 1. Join vào Course để lấy instructorId
      {
        $lookup: {
          from: "courses", // collection name
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      // 2. Unwind mảng course thành object
      { $unwind: "$course" },
      // 3. Lọc chỉ những enrollment có course.instructorId thỏa mãn
      {
        $match: {
          "course.instructorId": new mongoose.Types.ObjectId(instructorId),
        },
      },
      {
        $match: {
          createdAt: { $gte: currentWeekStart },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$price" },
          platformRevenue: { $sum: { $multiply: ["$price", 0.9] } },
        },
      },
    ]);

    const currentWeekTotal =
      currentWeekRevenue.length > 0
        ? Math.round(currentWeekRevenue[0].platformRevenue)
        : 0;

    // Calculate previous week revenue
    const previousWeekRevenue = await PaymentItem.aggregate([
      // 1. Join vào Course để lấy instructorId
      {
        $lookup: {
          from: "courses", // collection name
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      // 2. Unwind mảng course thành object
      { $unwind: "$course" },
      // 3. Lọc chỉ những enrollment có course.instructorId thỏa mãn
      {
        $match: {
          "course.instructorId": new mongoose.Types.ObjectId(instructorId),
        },
      },
      {
        $match: {
          createdAt: {
            $gte: previousWeekStart,
            $lte: previousWeekEnd,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$price" },
          platformRevenue: { $sum: { $multiply: ["$price", 0.9] } }, // 10% fee
        },
      },
    ]);

    const previousWeekTotal =
      previousWeekRevenue.length > 0
        ? Math.round(previousWeekRevenue[0].platformRevenue)
        : 0;

    // Calculate percentage change
    const percentChange = calculatePercentChange(
      currentWeekTotal,
      previousWeekTotal
    );

    // Get monthly data for the chart
    const monthlyData = await PaymentItem.aggregate([
      // 1. Join vào Course để lấy instructorId
      {
        $lookup: {
          from: "courses", // collection name
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      // 2. Unwind mảng course thành object
      { $unwind: "$course" },
      {
        $match: {
          "course.instructorId": new mongoose.Types.ObjectId(instructorId),
          createdAt: {
            $gte: new Date(currentYear, 0, 1),
            $lte: new Date(currentYear, 11, 31, 23, 59, 59, 999),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalSales: { $sum: "$price" },
          platformRevenue: { $sum: { $multiply: ["$price", 0.9] } }, // 10% fee
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Format chart data
    const chartData = Array.from({ length: 12 }, (_, i) => {
      const monthData = monthlyData.find((item) => item._id === i + 1);
      return {
        month: getMonthName(i),
        value: monthData ? Math.round(monthData.platformRevenue) : 0,
        // You might want to include total sales for reference
        totalSales: monthData ? monthData.totalSales : 0,
      };
    });

    return {
      total: totalRevenue,
      percent: percentChange,
      chartData,
      additionalData: {
        totalSales: totalSales, // Include total sales for reference
        platformFeePercentage: 10, // Document the fee percentage used
      },
    };
  },
};

export default StatisticsService;
