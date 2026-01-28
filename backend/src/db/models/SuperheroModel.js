import {sequelize} from '../sequelizer/sequelizer.js'
import { DataTypes } from 'sequelize'
import { baseModel } from './BaseModel.js'


export const Superhero = sequelize.define('Superhero',{
    ...baseModel,
    nickname:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
              len:[1,20]
        }
    },
    real_name:{
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
              len:[1,20]
        }
    },
    origin_description:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    superpowers:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    catch_phrase:{
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
            len:[2,30]
        }
    },
    images:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    }
},
{
    tablename:'superhero',
    timestamps:true,
    underscored:true
})