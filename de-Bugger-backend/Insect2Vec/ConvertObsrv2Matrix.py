import pickle as pkl


def add_month(time, months):
    year, month = time
    month += months
    while month > 12:
        year += 1
        month -= 12
    while month < 1:
        year -= 1
        month += 12
    return year, month


item_set = set()
mat = dict()
maps = dict()

tmp_t = (2018, 1)
end_t = (2021, 6)
while tmp_t[0] * 12 + tmp_t[1] <= end_t[0] * 12 + end_t[1]:
    print("Read data in ({}, {:02d})".format(tmp_t[0], tmp_t[1]))
    with (open("maps_{}-{:02d}.pkl".format(tmp_t[0], tmp_t[1]), "rb")) as f:
        maps[tmp_t] = pkl.load(f)
    tmp_t = add_month(tmp_t, 1)

for t in maps:
    print("t = ({}, {:02d})".format(t[0], t[1]))
    for long in maps[t]:
        for lat in maps[t][long]:
            for i in range(len(maps[t][long][lat])):
                obsrv_x = maps[t][long][lat][i]
                item_set.add(obsrv_x['scientificName'])
                
                # Observations in the same grid
                for j in range(i, len(maps[t][long][lat])):
                    if i == j:
                        continue
                    obsrv_y = maps[t][long][lat][j]
                    if (float(obsrv_y['Lat']) - float(obsrv_y['Lat']))**2 + (float(obsrv_y['Long']) - float(obsrv_y['Long']))**2 > 0.01:
                        continue
                    if (obsrv_x['scientificName'], obsrv_y['scientificName']) in mat:
                        mat[(obsrv_x['scientificName'], obsrv_y['scientificName'])] += 1
                    elif (obsrv_y['scientificName'], obsrv_x['scientificName']) in mat:
                        mat[(obsrv_y['scientificName'], obsrv_x['scientificName'])] += 1
                    else:
                        mat[(obsrv_x['scientificName'], obsrv_y['scientificName'])] = 1
                        
                # Observations in the nearby grids
                for dt, dlong, dlat in [(0, 0.1, 0), (0, 0, 0.1), (0, -0.1, 0), (0, 0, -0.1), 
                                        (0, 0.1, 0.1), (0, 0.1, -0.1), (0, -0.1, 0.1), (0, -0.1, -0.1),
                                        (1, 0.1, 0), (1, 0, 0.1), (1, -0.1, 0), (1, 0, -0.1),
                                        (-1, 0.1, 0), (-1, 0, 0.1), (-1, -0.1, 0), (-1, 0, -0.1)]:
                    nt = add_month(t, dt)
                    nlong, nlat = long + dlong, lat + dlat
                    if nt not in maps:
                        continue
                    if nlong not in maps[nt]:
                        continue
                    if nlat not in maps[nt][nlong]:
                        continue
                    for obsrv_y in maps[nt][nlong][nlat]:
                        if (float(obsrv_y['Lat']) - float(obsrv_y['Lat']))**2 + (float(obsrv_y['Long']) - float(obsrv_y['Long']))**2 > 0.01:
                            continue
                        if (obsrv_x['scientificName'], obsrv_y['scientificName']) in mat:
                            mat[(obsrv_x['scientificName'], obsrv_y['scientificName'])] += 1
                        elif (obsrv_y['scientificName'], obsrv_x['scientificName']) in mat:
                            mat[(obsrv_y['scientificName'], obsrv_x['scientificName'])] += 1
                        else:
                            mat[(obsrv_x['scientificName'], obsrv_y['scientificName'])] = 1


pkl.dump(mat, open("species_matrix.pkl", 'wb'))

with open("species_matrix.csv", "w", encoding='utf-8') as out_file:
    for key in mat:
        try:
            out_file.write("{}\t{}\t{}\n".format(key[0], key[1], mat[key]))
        except:
            print(key, mat[key])
