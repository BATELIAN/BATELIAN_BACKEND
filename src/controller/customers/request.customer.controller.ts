import CustomerModel from "../../model/customer.model";
import { Response, Request } from "express";
import { sendMail } from "../../utils/sendMail";

export const addRequests = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const { id } = req.params;

    // Find the customer by ID
    const customer = await CustomerModel.findOne({ _id: id });

    // If the customer is not found, return a 404 response
    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
        success: false,
      });
    }

    // Convert the input data into the structure expected by RequestSchema
    const requestsData = Array.isArray(data) ? data : [data];
    const newRequests = requestsData.map((requestData) => ({
      skills: requestData.selectedSkills.filter((skill) => typeof skill === 'string'),
      jobType: requestData.type.name,
      location: requestData.location.name,
    }));

    // Update the customer's request array with the new requests
    customer.request.push(...newRequests);

    // Save the updated customer information
    await customer.save();

    // Send an email to the customer
    await sendMail({
      email: customer.workEmail,
      subject: "Email verification",
      template: "thankyou.mail.ejs",
      data: {
        user: customer.employeeName,
      },
    });

    // Return a success response
    return res.status(201).json({
      message: "Requests made successfully",
      success: true,
    });
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error("Error adding requests:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
