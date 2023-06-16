export const setupDB = async (module) => {
  const UserRepository = module.get('UserRepository');
  const ProductRepository = module.get('ProductRepository');
  const OrderRepository = module.get('OrderRepository');
  const OrderDetailsRepository = module.get('OrderDetailsRepository');

  await OrderDetailsRepository.delete({});
  await OrderRepository.delete({});
  await ProductRepository.delete({});
  await UserRepository.delete({});
};
