import User from "../../models/User.js";
import { sendNotification } from "../../socket/socket-io.js";
import NotificationService from "../../services/NotificationService.js";
import Course from "../../models/Course.js";
import Enrollment from "../../models/Enrollment.js";

export const sendNOtificationToAdmin = async (data: {
  title: string;
  message: string;
}) => {
  const admins = await User.find({
    role: "admin",
  });

  for await (const admin of admins) {
    const notification = await NotificationService.createNotification({
      userId: admin._id,
      title: data.title,
      message: data.message,
      referenceUrl: `/dashboard/course-management`,
      to: "admin",
    });
    sendNotification(admin.email, notification);
  }
};

export const sendNotificationToInstructor = async (data: {
  title: string;
  message: string;
  instructorId: string;
  referenceUrl: string;
}) => {
  const instructor = await User.findById(data.instructorId);

  if (!instructor) return;

  const notification = await NotificationService.createNotification({
    userId: instructor._id,
    title: data.title,
    message: data.message,
    referenceUrl: data.referenceUrl,
    to: "instructor",
  });

  sendNotification(instructor.email, notification);
};

export const sendNotificationToStudents = async (data: {
  title: string;
  message: string;
  instructorId: string;
  referenceUrl: string;
}) => {
  const createdCourses = await Course.find({
    instructorId: data.instructorId,
  });

  const courseIds = createdCourses.map((course) => course._id);

  const enrollments = await Enrollment.find({
    courseId: { $in: courseIds },
  });

  for await (const enrollment of enrollments) {
    const studentId = enrollment.userId;
    const student = await User.findById(studentId);

    if (student) {
      const notification = await NotificationService.createNotification({
        userId: student._id,
        title: data.title,
        message: data.message,
        referenceUrl: data.referenceUrl,
        to: "user",
      });
      sendNotification(student.email, notification);
    }
  }
};
