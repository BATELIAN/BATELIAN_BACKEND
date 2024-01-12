import { Request, Response } from "express";
import { getAll, showSingle } from "../../utils/db_functions/hero.db";
import AboutModel from "../../model/about.model"
import ServiceModel from "../../model/service.model"
import StepModel from "../../model/step.model"
import HeroModel from "../../model/hero.model"
import PartnerModel from "../../model/partner.mode"
import ClientModel from "../../model/profile.model"
import CustomerModel from "../../model/customer.model"
import AdminModel from "../../model/admin.model"

export const getHeros = async (req: Request, res: Response) => {
  const folders = await getAll();
  res.status(200).send(folders);
};

export const getHero = async (req: Request, res: Response) => {
  const { id } = req.params;
  const folder = await showSingle(id);
  res.status(200).send(folder);
};


export const getAllData = async (req: Request, res: Response) => {
  try {
    // Fetch data from different models
    const aboutData = await AboutModel.find().exec();
    const serviceData = await ServiceModel.find().exec();
    const stepData = await StepModel.find().exec();
    const heroData = await HeroModel.find().exec();
    const partnerData = await PartnerModel.find().exec()
    // Combine data into an array of objects
    const allData = [
      { about: aboutData },
      { service: serviceData },
      { step: stepData },
      { hero: heroData },
      { partner: partnerData }
    ];

    // Send the combined data as a response
    res.json(allData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const overView = async (req: Request, res: Response) => {
  try {
    // Fetch data from different models
    const clientData = await ClientModel.find().exec();
    const adminData = await AdminModel.find().exec();
    const customerData = await CustomerModel.find().exec();

    // Filter and organize data based on the specified criteria
    const filteredData = {
      clientModel: {
        VERIFIED: clientData.filter((client) => client.status === "VERIFIED").length,
        PENDING: clientData.filter((client) => client.status === "PENDING").length,
      },
      adminModel: {
        ADMIN: adminData.filter((admin) => admin.role === "ADMIN").length,
        AGENT: adminData.filter((admin) => admin.role === "AGENT").length,
      },
      customerModel: {
        ASSIGNED: customerData.filter((customer) => customer.status === "ASSIGNED").length,
        SUCCESS: customerData.filter((customer) => customer.status === "SUCCESS").length,
        FAILED: customerData.filter((customer) => customer.status === "FAILED").length,
        PENDING: customerData.filter((customer) => customer.status === "PENDING").length,
      },
    };

    // Send the length of each array as a response
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


