import { PrismaClient, Product } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export const getProducts = async (req: any, res: any) => {
  try {
    const response: Product[] = await prisma.product.findMany();
    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
};

export const getProductsById = async (req: any, res: any) => {
  try {
    const response: Product | null = await prisma.product.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(500).json(response);
  } catch (err: any) {
    res.status(404).json({ msg: err.message });
  }
};

export const createProduct = async (req: any, res: any) => {
  const { name, price } = req.body;

  try {
    const product: Product = await prisma.product.create({
      data: {
        name: name,
        price: price,
      },
    });
    res.status(201).json(product);
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
};

export const updateProducts = async (req: any, res: any) => {
  const { name, price } = req.body;

  try {
    const product: Product = await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: name,
        price: price,
      },
    });
    res.status(200).json(product);
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
};

export const deleteProducts = async (req: any, res: any) => {
  try {
    const product: Product = await prisma.product.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(product);
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
};
