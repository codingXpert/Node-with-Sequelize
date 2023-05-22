module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("student",{
      name: DataTypes.STRING,
    },
    {
      tableName:'student',    
      underscored:true,    // to modify createdAt/updatedAt as created_at/updated_at
    }
  );
  return Student; 
}; 
