module.exports = (sequelize, DataTypes) => {
  const Employees = sequelize.define("employee",{
      name: DataTypes.STRING,
      userId:DataTypes.INTEGER
    },
    {
      paranoid:true,
      deletedAt:'softDelete',   //custom name 
      createdAt:'created_at',
      updatedAt:'modified_at'
    }
  );
  return Employees;
};
