package com.projet.quizzapp.tools;

import org.modelmapper.ModelMapper;

public class DtoTools {



    private static ModelMapper myMapper = new ModelMapper();


    public static <TSource, TDestination> TDestination convert(TSource obj, Class<TDestination> clazz)
            throws Exception {

        // Ajouter des règles personnalisées
        //		myMapper.typeMap(Product.class, ProductDto.class)
        //		.addMappings(mapper->{
        //			mapper.map(src->src.getDescription(), ProductDto::setDesignation);
        //			mapper.map(....);
        //		});
        //		//On définit également les règles inverses
        //		myMapper.typeMap(ProductDto.class, Product.class)
        //		.addMappings(mapper->{
        //			mapper.map(src->src.getDesignation(), Product::setDescription);
        //			mapper.map(...);
        //		});

        try {
            return myMapper.map(obj, clazz);
        } catch (Exception ex) {
            ex.printStackTrace(); // uniquement pour afficher les exceptions de mapping obj<>Dto
        }
        return null;
    }
}
