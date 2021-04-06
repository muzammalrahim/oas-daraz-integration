import json

def update_duplicates(data):
    final_list = []

    for row in data:
        if len(final_list) == 0:
            final_list.append(row)
        else:
            part_number, condition = row[1], row[8]
            for record in final_list:
                e_part_number, e_condition = record[1], record[8]
                if part_number == e_part_number and condition == e_condition:
                    record[3] = int(record[3]) + int(row[3])
                    break
                else:
                    final_list.append(row)
                    break
    return final_list


def update_inventory(model,objects):
    for objt in objects:
        try:
            existing_objects = model.objects.filter(part_number=objt.part_number,condition=objt.condition)
            sum_of_quantities = 0
            for existing_object in existing_objects:
                sum_of_quantities += int(existing_object.quantity)
                existing_object.delete()
            objt.quantity =  int(objt.quantity) + sum_of_quantities
        except:
            pass
    return None